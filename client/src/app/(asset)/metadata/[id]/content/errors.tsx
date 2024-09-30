import React from "react";
import { useRxData } from "rxdb-hooks";
import Loader from "~/components/loader";
import MessageBox from "~/components/message-box";
import { Typography } from "~/components/typography";
import type { MetadataCollection, ValidationsCollection } from "~/lib/types";

export default function Errors({ metadata }: { metadata: MetadataCollection }) {
  const { result, isFetching } = useRxData<ValidationsCollection>(
    "validations",
    (collection) => collection.findByIds([metadata.id]),
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const validationErrors: ValidationsCollection | undefined = result.map(
    (doc) => doc.toJSON() as ValidationsCollection,
  )[0];

  if (!validationErrors) return null;

  const { validation } = validationErrors;

  console.log(validation);

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-white/10 bg-secondary p-4 px-8 shadow-lg">
      <Typography as="h2">Errors</Typography>
      {validation.errors.map((e) => {
        return (
          <Section key={e.validatorId}>
            <Typography>
              {e.validatorId} : should be description for the validator (TODO)
            </Typography>
            {e.validationErrors.map((error, i) => {
              return (
                <MessageBox
                  key={`${e.validatorId}-${error.path.join(".")}-${i}`}
                  variant="error"
                >
                  <Typography>{error.message}</Typography>
                  <div className="mt-2 rounded-xl border border-border/20 bg-background p-4">
                    <code>{`[`}</code>
                    <Typography key={error.path.join(".")} className="pl-8">
                      <code>{`{ "path": "${error.path.join(".")}" }`}</code>
                    </Typography>
                    <code>{`]`}</code>
                  </div>
                </MessageBox>
              );
            })}
          </Section>
        );
      })}

      {validation.warnings.map((w) => {
        return (
          <Section key={w.validatorId}>
            <Typography>
              {w.validatorId} : should be description for the validator (TODO)
            </Typography>
            <MessageBox>
              <Typography>{w.validationErrors[0]?.message}</Typography>
              <div className="mt-2 rounded-xl border border-border/20 bg-background p-4">
                <code>{`[`}</code>
                {w.validationErrors.map((e) => {
                  return (
                    <Typography key={e.path.join(".")} className="pl-8">
                      <code>{`{ "path": "${e.path.join(".")}" }`}</code>
                    </Typography>
                  );
                })}
                <code>{`]`}</code>
              </div>
            </MessageBox>
          </Section>
        );
      })}
    </div>
  );
}

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-background p-4 pt-6">
      <Typography className="text-sm text-white/50">Description</Typography>
      {children}
    </div>
  );
};
