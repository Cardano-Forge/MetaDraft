import React from "react";
import { Typography } from "~/components/typography";

// TODO - Accordion : Add information like: all your metadata should have the same schema.

export default function HowToCreateMetadataSchema() {
  return (
    <div>
      <Typography>
        Available value are: string, number, object, array
      </Typography>
      <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4">
        <Typography as="h4">
          <code>Array values</code>
        </Typography>
        <Typography as="code">
          To make a good metadata schema put one element in the array to
          dertermine with array type this is.
        </Typography>
        <Typography
          as="code"
          className="text-sm text-white/50"
        >{`Array symbol is: []`}</Typography>
        <div className="flex flex-col gap-2 rounded-xl bg-card p-4">
          <Typography as="code">{`Definition of each array type & how to set it up in the creator`}</Typography>
          <Typography as="code">{`• string[]  ~> [ "Hello", "world" ]  ~> image: [ "string" ]`}</Typography>
          <Typography as="code">{`• number[] ~> [ 0, 1, 2, 3 ] ~> field: [ 0 ]`}</Typography>
          <Typography as="code">{`• object[] ~> [ {src: "string", mediaType: "string"} ] ~> files: [ { src: "string", mediaType: "string" } ]`}</Typography>
          <Typography as="code">{`• number[][] ~> [ [0, 1], [2, 3] ] ~> position: [ [ 0 ] ]`}</Typography>
        </div>
      </div>
    </div>
  );
}
