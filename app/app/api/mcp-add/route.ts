import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { a, b } = await req.json();

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
          name: "add_numbers",
          arguments: { a, b },
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
    console.log("Error calling MCP tool:", error);

    return NextResponse.json(
      { error: "Failed to call MCP tool" },
      { status: 500 }
    );
  }
}
