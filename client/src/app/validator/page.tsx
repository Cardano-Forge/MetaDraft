import { Typography } from "~/components/typography";

export default function Validator() {
  return (
    <>
      <Typography as="h2">Step name</Typography>
      <Typography as="p" className="text-sm text-white/50">
        step desc
      </Typography>
    </>
  );
}
