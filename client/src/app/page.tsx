import CreateProjectButton from "~/components/create-project-button";
import { Typography } from "~/components/typography";
import UploadProjectButton from "~/components/upload-project-button";

export default function HomePage() {
  return (
    <main className="container flex flex-col gap-8">
      <div className="mt-4 flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <div className="flex flex-row items-center justify-center lg:flex-col lg:items-start">
          <Typography as="h1" className="font-inter font-bold tracking-wide">
            Welcome
          </Typography>
          <Typography
            as="h1"
            className="ml-2 font-inter font-bold tracking-wide lg:ml-0 lg:mt-[10px]"
          >
            to MetaDraft
          </Typography>
        </div>
        <Typography className="max-w-[600px] text-pretty text-center text-white/50 lg:max-w-[350px] lg:text-left">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam
        </Typography>
      </div>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-8 rounded-xl p-4 lg:flex-row">
        <CreateProjectButton />
        <UploadProjectButton />
      </div>
    </main>
  );
}
