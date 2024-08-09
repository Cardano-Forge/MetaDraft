import H from "~/components/h";
import Icons from "./icons";
import Buttons from "./buttons";

export default function StyleGuidePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-white">
      <div className="container flex flex-col gap-4 px-4 py-16">
        <H>Style guide</H>
        <Icons />
        <Buttons />
      </div>
    </main>
  );
}
