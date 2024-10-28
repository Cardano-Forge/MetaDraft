"use client";

import { Typography } from "~/components/typography";

import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function RulesPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Rules Selection</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button onClick={() => router.push("/data-validation")}>
            Validate this Step
          </Button>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-card">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
}
