import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageData, prompt } = await req.json();

    const response = await fetch("http://localhost:8000/api/mcp/tools/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "analyze_image",
          arguments: { image_data: imageData, prompt },
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // Extract the result from the MCP response
    const result = data.result.content[0].text;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to analyze image with Gemini: ", error);

    return NextResponse.json(
      { error: "Failed to analyze image with Gemini" },
      { status: 500 }
    );
  }
}
