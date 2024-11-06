import React from "react";

import { Typography } from "~/components/typography";

export default function Typographies() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Typography</Typography>

      <div className="flex w-full flex-col justify-between gap-4 rounded-xl border p-4">
        <Typography as="h1">MetaDraft : H1</Typography>
        <Typography as="h2">MetaDraft : H2</Typography>
        <Typography as="h3">MetaDraft : H3</Typography>
        <Typography as="h4">MetaDraft : H4</Typography>
        <Typography as="h5">MetaDraft : H5</Typography>
        <Typography as="h6">MetaDraft : H6</Typography>
        <Typography as="p">
          PARAGRAPH : Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography as="blockquote">
          BLOCKQUOTE : Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography as="inlineCode">
          INLINE CODE : Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography as="smallText">
          SMALL TEXT : Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography as="regularText">
          REGULAR TEXT : Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </Typography>
        <Typography as="largeText">
          LARGE TEXT : Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography as="mutedText">
          MUTED TEXT : Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography as="ul">
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</li>
          <li>sed do eiusmod tempor incididunt ut</li>
          <li>labore et dolore magna aliqua.</li>
        </Typography>
      </div>
    </div>
  );
}
