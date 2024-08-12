import H from "~/components/h";
import Icons from "./icons";
import Buttons from "./buttons";
import Loader from "~/components/loader";

export default function StyleGuidePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-white">
      <div className="container flex flex-col gap-4 px-4 py-16">
        <H>Style guide</H>
        <div className="mt-4 flex flex-row items-center gap-4">
          <H variant="h6">Loader :</H>
          <Loader />
          <Loader className="loader-white" />
        </div>
        <Icons />
        <Buttons />
      </div>
    </main>
  );
}
