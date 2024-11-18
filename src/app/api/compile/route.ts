import { NextRequest, NextResponse } from "next/server";

// import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

export async function POST(Request: NextRequest) {
  try {
    const { Code } = await Request.json();
    // Create a temporary file in the /tmp directory
    const tempFilePath = path.join("/tmp", "temp.c");

    // Write the C code to the temporary file
    fs.writeFileSync(tempFilePath, Code);
    exec(`gcc ${tempFilePath} -o /tmp/temp && /tmp/temp`, (error, stdout) => {
      if (error instanceof Error) {
        console.error(error.message);
        return NextResponse.json({ message: error.message });
      }
      return NextResponse.json({ message: stdout.toString() });
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ message: error.message });
    }
  }
}
