import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, temperature, maxTokens } = await req.json();

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
          name: "generate_text",
          arguments: { prompt, temperature, max_tokens: maxTokens },
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    console.log(data)

    // Extract the result from the MCP response
    const result = data.result.content[0].text;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error calling Gemini API:", error);

    return NextResponse.json(
      { error: "Failed to call Gemini API" },
      { status: 500 }
    );
  }
}
