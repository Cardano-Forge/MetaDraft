import React from "react";
import { useRxData } from "rxdb-hooks";
import MessageBox from "~/components/message-box";
import { Typography } from "~/components/typography";
import type {
  MetadataCollection,
  RulesCollection,
  ValidationsCollection,
} from "~/lib/types";
import { RULES_DESCRIPTION, type Rule } from "~/lib/rules";
import { hyphenToCamelCase } from "~/lib/types/hyphen-to-camel-case";
import { hyphenToTitleCase } from "~/lib/hyphen-to-title-case";
import { useActiveProject } from "~/providers/active-project.provider";
import LoaderComponent from "~/components/loader-component";

export default function Errors({ metadata }: { metadata: MetadataCollection }) {
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<ValidationsCollection>(
    "validations",
    (collection) => collection.findByIds([metadata.id]),
  );

  const { result: rulesResults, isFetching: isFetchingRules } =
    useRxData<RulesCollection>("rules", (collection) =>
      collection.findByIds([activeProject?.id ?? ""]),
    );

  if (isFetching || isFetchingRules) return <LoaderComponent />;

  const validationErrors: ValidationsCollection | undefined = result.map(
    (doc) => doc.toJSON() as ValidationsCollection,
  )[0];

  const rules: RulesCollection | undefined = rulesResults.map(
    (doc) => doc.toJSON() as RulesCollection,
  )[0];

  if (!rules) return null;

  if (metadata.status === "success")
    return (
      <div className="flex w-full flex-col gap-4 rounded-xl border border-white/10 bg-card p-4 px-8 shadow-lg">
        <Typography as="h2">Validated</Typography>
        <div className="flex flex-col gap-4 rounded-xl bg-background p-4 pt-6">
          <Typography>
            All the validation rules have been successfully checked:
            <br />
            <ul>
              {rules.rules.map((rule) => (
                <li key={rule}>
                  <Typography className="ml-4 text-success">
                    • {hyphenToTitleCase(rule)}
                  </Typography>
                </li>
              ))}
            </ul>
            We are pleased to report that no warnings or errors were found
            during the validation process. This ensures that the metadata
            adheres to the selected rules, promoting consistency and
            reliability. Your asset metadata is now fully compliant with your
            rule set and ready for use.
          </Typography>
        </div>
      </div>
    );

  // TODO - return something when user manualy set status to error and is dotn have any real error. maybe a error form maker ? :thinking:
  if (!validationErrors) return null;

  const { validation } = validationErrors;

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-card p-4 px-8 shadow-lg">
      <Typography as="h2">Errors</Typography>
      {validation.errors.map((e) => {
        return (
          <Section key={e.validatorId}>
            <Typography>
              {RULES_DESCRIPTION[hyphenToCamelCase(e.validatorId) as Rule]}
            </Typography>
            {e.validationErrors.map((error, i) => {
              return (
                <MessageBox
                  key={`${e.validatorId}-${error.path.join(".")}-${i}`}
                  variant="error"
                >
                  <Typography>{error.message}</Typography>
                  {!!error.path.length && (
                    <div className="mt-2 rounded-xl border border-border/20 bg-background p-4">
                      <code>{`[`}</code>
                      <Typography key={error.path.join(".")} className="pl-8">
                        <code>{`{ "path": "${error.path.join(".")}" }`}</code>
                      </Typography>
                      <code>{`]`}</code>
                    </div>
                  )}
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
              {RULES_DESCRIPTION[hyphenToCamelCase(w.validatorId) as Rule]}
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
