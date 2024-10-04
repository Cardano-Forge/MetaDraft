"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useRxCollection } from "rxdb-hooks";

import { AlertDialog } from "~/components/ui/alert-dialog";
import { Typography } from "~/components/typography";
import CloudUploadIcon from "~/icons/cloud-upload.icon";
import { getFileExtension } from "~/lib/get/get-file-extension";
import { getFileName, readFile } from "~/lib/read";
import { JSONSchema } from "~/lib/zod-schemas";
import type {
  MetadataCollection,
  ProjectCollection,
  RulesCollection,
} from "~/lib/types";

import UploadAlert from "./upload-alert";
import { DEFAULT_RULES } from "~/lib/constant";

export function UploadProjectButton() {
  const router = useRouter();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [alert, setAlert] = useState<boolean>(false);
  // RXBD
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const activeProjectCollection = useRxCollection<ProjectCollection>("project");
  const rulesCollection = useRxCollection<RulesCollection>("rules");

  // Upload
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // ** Handle accepted files
      if (acceptedFiles.length === 1) {
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
          await metadataCollection?.bulkUpsert(
            zodValidation.data.map((m) => ({
              id: self.crypto.randomUUID(),
              ...m,
              status: "unchecked",
            })),
          );

          // Add project information in RXDB
          const project = await activeProjectCollection?.upsert({
            id: "activeProject",
            metadataId: self.crypto.randomUUID(),
            name: getFileName(acceptedFiles[0]),
            nfts: zodValidation.data.length,
            unchecked: zodValidation.data.length,
            errorsDetected: 0,
            errorsFlagged: 0,
            valids: 0,
          });

          // Add Default Rules
          await rulesCollection?.upsert({
            id: project?.metadataId ?? self.crypto.randomUUID(),
            rules: DEFAULT_RULES,
          });

          router.push("/metadata-structure");
        } catch (error) {
          setError(
            new Error((error as Error).message ?? "Something went wrong"),
          );
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
    [metadataCollection, activeProjectCollection, rulesCollection, router],
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

  return (
    <>
      <div
        {...getRootProps()}
        className="flex min-h-[450px] w-full min-w-[300px] cursor-pointer flex-col items-center justify-center gap-8 rounded-2xl border border-dashed border-input/20 bg-transparent hover:bg-card/70"
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
