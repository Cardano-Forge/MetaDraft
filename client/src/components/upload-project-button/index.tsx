"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useRxCollection } from "rxdb-hooks";

import UploadAlert from "./upload-alert";
import Loader from "../loader";
import { Typography } from "~/components/typography";
import { AlertDialog } from "~/components/ui/alert-dialog";
import CloudUploadIcon from "~/icons/cloud-upload.icon";
import { DEFAULT_RULES } from "~/lib/constant";
import { getFileExtension } from "~/lib/get/get-file-extension";
import { getMetadataSchema } from "~/lib/get/get-metadata-schema";
import { getFileName, readFile } from "~/lib/read";
import type {
  MetadataCollection,
  MetadataCollectionEditor,
  MetadataSchemaCollection,
  ProjectCollection,
  RulesCollection,
} from "~/lib/types";
import { JSONSchema } from "~/lib/zod-schemas";


export function UploadProjectButton() {
  const router = useRouter();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [alert, setAlert] = useState<boolean>(false);
  // RXBD
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const metadataSchemaCollection =
    useRxCollection<MetadataSchemaCollection>("metadataSchema");
  const activeProjectCollection = useRxCollection<ProjectCollection>("project");
  const rulesCollection = useRxCollection<RulesCollection>("rules");

  // Upload
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // ** Handle accepted files
      if (acceptedFiles.length === 1) {
        setLoading(true);
        try {
          // Get JSON object[] format of the file.
          const json = await readFile(acceptedFiles[0]);
          // Zod Validation
          const zodValidation = JSONSchema.safeParse(json);

          if (!zodValidation.success) {
            setAlert(true);
            return;
          }

          // const hash = await stringToHash(JSON.stringify(json)); // This will be the active project id

          // Add metadata in RXDB
          const upsertMetadatas = await metadataCollection?.bulkUpsert(
            zodValidation.data.map((m) => ({
              id: self.crypto.randomUUID(),
              ...m,
              status: "unchecked",
            })),
          );

          // Add project information in RXDB
          const project = await activeProjectCollection?.upsert({
            id: self.crypto.randomUUID(),
            name: getFileName(acceptedFiles[0]),
            nfts: zodValidation.data.length,
            unchecked: zodValidation.data.length,
            errorsDetected: 0,
            errorsFlagged: 0,
            valids: 0,
          });

          if (project)
            // Add Default Rules
            await rulesCollection?.upsert({
              id: project.id,
              rules: DEFAULT_RULES,
            });

          if (upsertMetadatas?.success) {
            // Get metadatas from RxDocument
            const metadatas: MetadataCollection[] = upsertMetadatas.success.map(
              (doc) => doc.toJSON() as MetadataCollection,
            );
            // Get schema from metadatas
            const schema = getMetadataSchema(
              metadatas,
            ) as MetadataCollectionEditor;
            // Save schema in RxDB
            await metadataSchemaCollection?.upsert({
              id: "schema",
              schema,
            });
          }

          router.push("/metadata-structure");
        } catch (error) {
          setError(
            new Error((error as Error).message ?? "Something went wrong"),
          );
        } finally {
          setLoading(false);
        }
      }

      // ** Handle rejected files
      // No file received
      if (fileRejections.length === 0) setError(undefined);

      // Too many in accepted or rejected files
      if (fileRejections.length > 1)
        setError(
          new Error(
            "Too many file were provided, please select only one file.",
          ),
        );

      // Has only on error
      const rejected = fileRejections[0];
      if (rejected) {
        const fileExtension = getFileExtension(rejected.file.name);
        if (rejected.errors[0]?.code === "file-invalid-type") {
          setError(
            new Error(
              `File type must be application/json or text/csv but received .${fileExtension}`,
            ),
          );
        } else {
          setError(new Error(rejected.errors[0]?.message));
        }
      }
    },
    [
      metadataCollection,
      activeProjectCollection,
      rulesCollection,
      router,
      metadataSchemaCollection,
    ],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop,
    maxFiles: 1,
    accept: { "application/json": [] }, // "text/csv": []
  });

  // Clear error after 6s
  useEffect(() => {
    if (error) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        setError(undefined);
      }, 6_000);
    }
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [error]);

  if (loading)
    return (
      <div className="flex min-h-[450px] w-full min-w-[300px] cursor-pointer flex-col items-center justify-center gap-8 rounded-2xl border border-input/20 bg-card/70">
        <Loader />
      </div>
    );

  return (
    <>
      <div
        {...getRootProps()}
        className={
          "flex min-h-[450px] w-full min-w-[300px] cursor-pointer flex-col items-center justify-center gap-8 rounded-2xl border border-dashed border-input/20 bg-transparent hover:bg-card/70"
        }
      >
        <input {...getInputProps()} multiple={false} />
        <CloudUploadIcon />
        <div className="flex flex-col items-center justify-center gap-4">
          <Typography as={"largeText"} className="font-inter text-2xl">
            Upload an existing project
          </Typography>
          {isDragActive ? (
            <Typography as={"mutedText"} className="font-normal">
              Drop the file here...
            </Typography>
          ) : (
            <>
              <Typography as={"mutedText"} className="font-normal">
                <span className="text-white">Upload</span> or{" "}
                <span className="text-white">drag and drop</span> your JSON file
              </Typography>

              {!!error && (
                <Typography
                  as={"mutedText"}
                  className="font-normal text-red-600"
                >
                  {error.message}
                </Typography>
              )}
            </>
          )}
        </div>
      </div>
      <AlertDialog open={alert} onOpenChange={setAlert}>
        <UploadAlert />
      </AlertDialog>
    </>
  );
}
