import H from "~/components/h";
import Icons from "./icons";

export default function StyleGuidePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col gap-4 px-4 py-16">
        <H>Style guide</H>
        <Icons />
      </div>
    </main>
  );
}
