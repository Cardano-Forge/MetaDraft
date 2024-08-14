import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <a href="/">
      <Image width={300} height={80} src={"/logo.png"} alt="MetaDraft" />
    </a>
  );
}
