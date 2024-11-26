import { JsonEditor, type UpdateFunction } from "json-edit-react";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { useRxCollection } from "rxdb-hooks";

import HowToCreateMetadataSchema from "./how-to";
import LoaderComponent from "~/components/loader-component";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { DEFAULT_CIP25_SCHEMA } from "~/lib/constant";
import {
  createRestrictionAdd,
  createRestrictionDelete,
  createRestrictionEdit,
  jerRestrictTypeSelection,
  jerTheme,
} from "~/lib/json-editor";
import { reconcileWithSchema } from "~/lib/reconcile-with-schema";
import type {
  MetadataCollection,
  MetadataCollectionEditor,
  MetadataSchemaCollection,
} from "~/lib/types";
import { MetadataCollectionSchemaV2 } from "~/lib/zod-schemas";
import { cn } from "~/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export default function JSONCreator({
  metadatas,
  structure,
  hasUnsavedChanges,
  setHasUnsavedChanges,
}: {
  metadatas: MetadataCollection[];
  structure?: MetadataCollectionEditor;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const pathname = usePathname(); // Tracks the current path

  const previousPathname = useRef<string | null>(null);

  const [metadataSchema, setMetadataSchema] =
    React.useState<MetadataCollectionEditor>(structure ?? DEFAULT_CIP25_SCHEMA);
  const metadataSchemaCollection =
    useRxCollection<MetadataSchemaCollection>("metadataSchema");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");

  // todo this for next button from page -> need to move some logic upper
  React.useEffect(() => {
    const handleRouteChange = () => {
      if (hasUnsavedChanges) {
        const confirmLeave = confirm(
          "You have unsaved changes. Are you sure you want to leave this page?",
        );
        if (!confirmLeave) {
          // Reset the URL back to the original path
          router.push(previousPathname.current ?? pathname);
          return;
        }
        setHasUnsavedChanges(false); // Reset unsaved changes if navigation proceeds
      }
      previousPathname.current = pathname; // Update previous path after confirmation
    };

    // Trigger the handler when the pathname changes
    if (previousPathname.current !== null) {
      handleRouteChange();
    } else {
      previousPathname.current = pathname; // Initialize previous path
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ""; // Standard dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleOnAdd: UpdateFunction = ({ newData, currentData, path }) => {
    const data = currentData as MetadataCollection;
    // When adding in files[] add base element { src: "string", mediaType: "string" }
    if (
      path.length === 3 &&
      path.includes("metadata") &&
      path.includes("files")
    ) {
      const newAddInFiles = {
        ...data,
        metadata: {
          ...data.metadata,
          files: [
            ...(data.metadata.files ?? []),
            { src: "ipfs://...", mediaType: "image/png" },
          ],
        },
      };
      setMetadataSchema(newAddInFiles as MetadataCollectionEditor);
      return ["value", newAddInFiles];
    }

    setMetadataSchema(newData as MetadataCollectionEditor);
    setHasUnsavedChanges(true);
    return true;
  };

  const handleOnUpdate: UpdateFunction = ({ newData }) => {
    // Zod Validation on update
    const zodResults = MetadataCollectionSchemaV2.safeParse(newData);
    if (!zodResults.success) {
      const errorMessage = zodResults.error.issues
        ?.map((error) => `${error.message}`)
        .join("\n");
      // This string returned to and displayed in json-edit-react UI
      return errorMessage;
    }

    // Save in React state
    if (zodResults.success) {
      setMetadataSchema(zodResults.data);
    }
    setHasUnsavedChanges(true);
  };

  const handleSaveSchema = async () => {
    try {
      setLoading(true);
      // Save Schema
      await metadataSchemaCollection?.upsert({
        id: "schema",
        schema: metadataSchema,
      });

      // Add metadata in RXDB
      await metadataCollection?.bulkUpsert(
        metadatas.map((m) => ({
          ...m,
          ...(reconcileWithSchema(
            metadataSchema,
            m,
          ) as Partial<MetadataCollection>[]),
        })),
      );
    } catch (e) {
    } finally {
      setLoading(false);
      setHasUnsavedChanges(false);
    }
  };

  if (loading) return <LoaderComponent />;

  return (
    <div className="flex min-w-[60%] flex-col gap-4 rounded-xl bg-card p-4 px-8">
      <div className="flex flex-row items-center justify-between">
        <Typography as="h2">JSON Creator</Typography>
        <Button
          variant={hasUnsavedChanges ? "ghost" : "default"}
          className={cn(hasUnsavedChanges && "animate-pulseShadow")}
          onClick={handleSaveSchema}
        >
          Save Metadata Structure
        </Button>
      </div>
      <Typography as="code" className="text-white/70">
        {`All metadata should follow the same format. While exceptions like 1:1
        formats are possible, it's generally not considered a good practice.`}
      </Typography>
      <JsonEditor
        data={metadataSchema}
        showErrorMessages
        collapse={2}
        enableClipboard={false}
        defaultValue={""}
        rootFontSize={18}
        minWidth={"100%"}
        className="jer-custom"
        theme={jerTheme}
        restrictEdit={createRestrictionEdit}
        restrictAdd={createRestrictionAdd}
        restrictDelete={createRestrictionDelete}
        restrictTypeSelection={jerRestrictTypeSelection}
        onAdd={handleOnAdd}
        onUpdate={handleOnUpdate}
      />
      <HowToCreateMetadataSchema />
    </div>
  );
}
