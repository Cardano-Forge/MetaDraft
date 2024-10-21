"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "~/components/header";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="relative min-h-screen">
      <Image
        fill
        alt="not-found"
        src="/404.png"
        className="absolute z-0"
        style={{ objectFit: "cover", overflow: "hidden" }}
      />
      <div className="fixed w-full">
        <Header />
      </div>
      <div className="fixed bottom-20 flex w-full flex-col items-center justify-center gap-4">
        <Typography as="code" className="uppercase">
          404 - Page Not found
        </Typography>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button
            variant={"outline"}
            size={"sm"}
            className="w-20"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button size={"sm"} className="w-20" onClick={() => router.push("/")}>
            Home
          </Button>
        </div>
      </div>
    </main>
  );
}
