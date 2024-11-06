"use client";

import Userback from "@userback/widget";
import { useEffect } from "react";

import { env } from "~/env";

const UserbackAnchor = () => {
  useEffect(() => {
    void Userback(env.NEXT_PUBLIC_USERBACK_ID); // Now TypeScript recognizes the type
  }, []);

  return null;
};

export default UserbackAnchor;
