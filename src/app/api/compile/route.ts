import { NextResponse } from "next/server";

// import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    // Create a temporary file in the /tmp directory
    const tempFilePath = path.join("/tmp", "temp.c");

    // Write the C code to the temporary file
    fs.writeFileSync(tempFilePath, "Hello World");
    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ message: error.message });
    }
  }
}
