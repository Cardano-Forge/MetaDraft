"use client";

import Link from "next/link";

import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

export default function RulesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Rules Selection</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Read each rule carefully and select all that apply.
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button asChild>
            <Link title="Go to data validation" href={"/data-validation"}>
              Next step
              <span className="sr-only">
                Complete this step and navigate to next one: data validation
              </span>
            </Link>
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
