# MCP Server Integration with Next.js and FastAPI

A full-stack application that integrates the Model Context Protocol (MCP) with a Next.js frontend and FastAPI backend, allowing AI models to access tools and data through a standardized interface.

## Overview

This project demonstrates how to build an MCP server that can be used with Claude Desktop and other MCP-compatible clients. It features:

- A FastAPI backend that implements the MCP protocol
- A Next.js app for interacting with the MCP server
- Integration with Google's Gemini API for text generation and image analysis
- A clean, responsive UI built with Tailwind CSS

## Features

- **Text Generation**: Generate text using Google's Gemini 2.0 Flash model
- **Image Analysis**: Analyze images using Gemini's multimodal capabilities
- **Tool Discovery**: Browse available MCP tools and their descriptions
- **MCP Protocol Support**: Full implementation of the MCP protocol for tools and resources

## Prerequisites

- Python 3.10+
- Node.js 20+
- Google API key for Gemini

## Installation

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/vaibbhavk/mcp-fastapi-nextjs-gemini.git
cd mcp-fastapi-nextjs-gemini
```

2. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Create a `.env` file from `.env.example` file in the backend directory:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend Setup

1. Install frontend dependencies:

```bash
cd ../app
npm install
```

## Running the Application

### Start the Backend

```bash
cd backend
uvicorn fastapi_backend:app --reload
```

The FastAPI server will run on http://localhost:8000.

### Start the Frontend

```bash
cd app
npm run dev
```

The Next.js app will run on http://localhost:3000.

## Project Structure

```
├── backend/
│   ├── fastapi_backend.py  # FastAPI application with MCP integration
│   ├── mcp_server.py       # MCP server implementation
│   └── requirements.txt    # Python dependencies
├── app/
│   ├── app/                # Next.js App Router directory
│   │   ├── api/            # API routes for MCP communication
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Main application page
│   └── package.json        # Node.js dependencies
└── README.md
```

## Using with Claude Desktop

To use this MCP server with Claude Desktop:

1. Install Claude Desktop from https://claude.ai/download
2. Add the server to your Claude Desktop configuration
3. Connect to the server through the Claude interface

## Development

### Adding New Tools

To add new tools to the MCP server, modify the `mcp_server.py` file:

```python
@mcp.tool()
async def your_new_tool(param1: str, param2: int) -> str:
    """Description of your new tool."""
    # Tool implementation
    return result
```

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) for the protocol specification
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [Next.js](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Google Gemini API](https://ai.google.dev/) for AI capabilities
