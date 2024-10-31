"use client";

import { useEffect, useRef } from "react";

import Userback, { type UserbackWidget } from "@userback/widget";

import { env } from "~/env";
import { useActiveProject } from "~/providers/active-project.provider";

const UserbackAnchor = () => {
  const userback = useRef<UserbackWidget>();
  const activeProject = useActiveProject();
  const project = activeProject?.toJSON();

  useEffect(() => {
    if (!project) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    Userback(env.NEXT_PUBLIC_USERBACK_ID).then((ub) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userback.current = ub;
      const data = {
        user_data: {
          project,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      ub.identify(project.id, data);
    });
  }, [project]);

  return null;
};

export default UserbackAnchor;
