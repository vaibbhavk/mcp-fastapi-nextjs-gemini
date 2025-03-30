from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.routing import Mount
import uvicorn
from contextlib import asynccontextmanager
import os
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()

# Import our MCP server
from mcp_server import mcp

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: setup resources
    print("Starting up MCP integration...")
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    yield
    # Shutdown: cleanup resources
    print("Shutting down MCP integration...")

app = FastAPI(title="NextJS-FastAPI-MCP-Gemini Integration", lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your Next.js domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic API endpoints
@app.get("/api/ping")
async def health_check():
    return {"status": "ok", "service": "NextJS-FastAPI-MCP-Gemini Integration"}

@app.get("/api/mcp/tools")
async def list_mcp_tools():
    # Get tools using the public API
    tools = await mcp.list_tools()
    return {"tools": tools}

@app.get("/api/mcp/resources")
async def list_mcp_resources():
    # This is just a helper endpoint to see available resources
    resources = await mcp.list_resources()
    return {"resources": resources}

@app.post("/api/mcp/tools/call")
async def call_mcp_tool(request: Request):
    try:
        data = await request.json()
        name = data.get("params", {}).get("name")
        arguments = data.get("params", {}).get("arguments", {})
        
        if not name:
            return {"error": "Missing tool name"}, 400
        
        # Call the MCP tool
        result = await mcp.call_tool(name, arguments)

        # Extract the result from the response
        if len(result) > 0:
            # Handle different response formats
            if hasattr(result[0], "text"):
                return {"result": {"content": [{"text": result[0].text}]}}
            else:
                return {"result": {"content": [{"text": str(result[0])}]}}
        
        return {"result": {"content": [{"text": "Operation completed but no result returned"}]}}
    except Exception as e:
        return {"error": f"Error calling MCP tool: {str(e)}"}, 500



# Mount the MCP server as an ASGI app within FastAPI
# This allows the Next.js frontend to communicate with the MCP server directly
app.routes.append(Mount("/mcp", app=mcp.sse_app()))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
