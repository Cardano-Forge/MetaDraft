"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";

import CloudUploadIcon from "~/icons/cloud-upload.icon";
import { Typography } from "./typography";
import { getFileExtension } from "~/lib/get-file-extension";
import { getFileName, readFile } from "~/lib/read";
import { useRouter } from "next/navigation";
import { useRxCollection } from "rxdb-hooks";
import type { Metadata, ActiveProject, Project } from "~/lib/db/types";
import { jsonFileSchema } from "~/lib/zod-schemas";

export default function UploadProjectButton() {
  const router = useRouter();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const metadataCollection = useRxCollection<Metadata>("metadata");
  const projectCollection = useRxCollection<Project>("project");
  const activeProjectCollection =
    useRxCollection<ActiveProject>("activeProject");

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Handle accepted files
      if (acceptedFiles.length === 1) {
        const json = await readFile(acceptedFiles[0]);

        // TODO - Handle parse failure
        const data = jsonFileSchema.parse(json); // TODO - ZOD check the json format better for CIP25

        // const hash = await stringToHash(JSON.stringify(json)); // This will be the active project id

        const meta = await metadataCollection?.upsert({
          id: "nonce",
          data,
        });

        // TODO - VALIDATION HERE TO UPDATE DATA

        const project: Project = {
          id: "project",
          name: getFileName(acceptedFiles[0]),
          nfts: data.length,
          errorsDetected: data.length,
          errorsFlagged: 0,
          valids: 0,
        };

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
