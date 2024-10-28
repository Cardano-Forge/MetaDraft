"use client";

import React from "react";
import { Button } from "~/components/ui/button";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-row items-center justify-end p-4">
      <Button title="Back to top" onClick={scrollToTop}>Back to Top</Button>
    </div>
  );
}
