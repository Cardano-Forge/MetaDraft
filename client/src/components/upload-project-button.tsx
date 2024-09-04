"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useRxCollection } from "rxdb-hooks";

import CloudUploadIcon from "~/icons/cloud-upload.icon";
import { Typography } from "./typography";
import { getFileExtension } from "~/lib/get-file-extension";
import { getFileName, readFile } from "~/lib/read";
import { JSONSchema } from "~/lib/zod-schemas";
import type {
  Metadata,
  ActiveProject,
  Project,
  MetadataValidations,
} from "~/lib/db/types";
import type { MetatdataJSON, ValidatorResults } from "~/lib/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { validateMetadata } from "~/server/validations";

export default function UploadProjectButton() {
  const router = useRouter();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [alert, setAlert] = useState<boolean>(false);
  const metadataCollection = useRxCollection<Metadata>("metadata");
  const projectCollection = useRxCollection<Project>("project");
  const validationsCollection =
    useRxCollection<MetadataValidations>("validations");
  const activeProjectCollection =
    useRxCollection<ActiveProject>("activeProject");

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Handle accepted files
      if (acceptedFiles.length === 1) {
        // Get JSON object[] format of the file.
        try {
          const json = await readFile(acceptedFiles[0]);
          // Zod Validation
          if (!JSONSchema.safeParse(json).success) {
            setAlert(true);
            return;
          }

          const data: MetatdataJSON = JSONSchema.parse(json); // Zod Validator Throw on fail

          // const hash = await stringToHash(JSON.stringify(json)); // This will be the active project id

          // Add metadata in RXDB
          const meta = await metadataCollection?.upsert({
            id: "nonce",
            data,
          });

          const results = await validateMetadata(data); // Validate the metadata
          const validations = JSON.parse(results) as ValidatorResults; // JSON parse string to object
          // Add validations in RXDB
          await validationsCollection?.upsert({
            id: "validations",
            validations,
          });

          // todo - method to get errors, warning & success number

          const project: Project = {
            id: "project",
            name: getFileName(acceptedFiles[0]),
            nfts: data.length,
            errorsDetected: data.length,
            errorsFlagged: 0,
            valids: 0,
          };

          // Add porject information in RXDB
          await projectCollection?.upsert(project);

          if (meta) {
            await activeProjectCollection?.upsert({
              id: "activeProject",
              metadataId: meta.id,
            });

            router.push("/data-validation");
          } else {
            // fail
            // TODO - handle error
            console.log(meta);
          }
        } catch (error) {
          console.log("CATCH ERROR : ", error);
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
    [metadataCollection, activeProjectCollection, router],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop,
    maxFiles: 1,
    accept: { "application/json": [] }, // "text/csv": []
  });

  // Clear error after 8s
  useEffect(() => {
    if (error) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        setError(undefined);
      }, 5_000);
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
        <AlertDialogContent className="border-destructive">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-bold text-red-500">
              Format Error
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your metadata does not conform to the required format. <br />
              <br />
              Please review the formatting guidelines and ensure that your
              metadata matches the example provided. This includes adhering to
              the specified structure, key naming conventions, and data types.
              Following the example closely will help avoid any potential
              issues.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!justify-center">
            <AlertDialogCancel className="w-full text-destructive sm:mx-6">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
