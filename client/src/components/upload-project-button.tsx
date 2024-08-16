"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";

import CloudUploadIcon from "~/icons/cloud-upload.icon";
import { Typography } from "./typography";
import { getFileExtension } from "~/lib/get-file-extension";
import { readFile } from "~/lib/read";
import { useRouter } from "next/navigation";
import { useRxCollection } from "rxdb-hooks";

export default function UploadProjectButton() {
  const router = useRouter();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const metadataCollection = useRxCollection("metadata");
  const activeProjectCollection = useRxCollection("activeProject");

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Handle accepted files
      if (acceptedFiles.length === 1) {
        const json = await readFile(acceptedFiles[0]);
        // const hash = await stringToHash(JSON.stringify(json));

        const meta = await metadataCollection?.upsert({
          id: "nonce",
          data: json,
        });
        if (meta) {
          await activeProjectCollection?.upsert({
            id: "activeProject",
            metadataId: "nonce",
          });

          router.push("/data-validation");
        } else {
          // fail
          // TODO - handle error
          console.log(meta);
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
    <div
      {...getRootProps()}
      className="flex h-[452px] w-full min-w-[300px] flex-col items-center justify-center gap-8 rounded-2xl border border-dashed border-input/20 bg-transparent hover:bg-card/70"
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
              <span className="text-white">drag and drop</span> your Json file
            </Typography>

            {!!error && (
              <Typography as={"mutedText"} className="font-normal text-red-600">
                {error.message}
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
  );
}
