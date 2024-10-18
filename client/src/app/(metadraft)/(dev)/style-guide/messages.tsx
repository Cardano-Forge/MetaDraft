import React from "react";
import MessageBox from "~/components/message-box";
import { Typography } from "~/components/typography";

export default function MessagesGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Message</Typography>
      <MessageBox>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </MessageBox>
      <MessageBox variant="error">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </MessageBox>
    </div>
  );
}
