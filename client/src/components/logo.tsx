import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <a href="/">
      <Image width={143} height={30} src={"/logo.png"} alt="MetaDraft" />
    </a>
  );
}
