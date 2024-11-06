import { mapping } from "@ada-anvil/metadraft-validator";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keys = Object.keys(mapping);

    return NextResponse.json({ keys });
  } catch (error) {
    console.error("Error fetching mapping:", error);
    return NextResponse.json(
      { error: "Failed to retrieve keys" },
      { status: 500 },
    );
  }
}
