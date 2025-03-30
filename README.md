# MCP Server Integration with Next.js and FastAPI

A full-stack application that integrates the Model Context Protocol (MCP) with a Next.js frontend and FastAPI backend, allowing AI models to access tools and data through a standardized interface.

## Overview

This project demonstrates how to build an MCP server that can be used with Claude Desktop and other MCP-compatible clients. It features:

- A FastAPI backend that implements the MCP protocol
- A Next.js frontend for interacting with the MCP server
- Integration with Google's Gemini API for text generation, image analysis, and chat
- A clean, responsive UI built with Tailwind CSS

## Features

- **Text Generation**: Generate text using Google's Gemini Pro model
- **Image Analysis**: Analyze images using Gemini's multimodal capabilities
- **Chat Interface**: Have multi-turn conversations with Gemini
- **Tool Discovery**: Browse available MCP tools and their descriptions
- **MCP Protocol Support**: Full implementation of the MCP protocol for tools and resources

## Prerequisites

- Python 3.8+
- Node.js 18+
- Google API key for Gemini

## Installation

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mcp-nextjs-fastapi.git
cd mcp-nextjs-fastapi
```

2. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend Setup

1. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend

```bash
cd backend
python fastapi_backend.py
```

The FastAPI server will run on http://localhost:8000.

### Start the Frontend

```bash
cd frontend
npm run dev
```

The Next.js frontend will run on http://localhost:3000.

## Project Structure

```
├── backend/
│   ├── fastapi_backend.py  # FastAPI application with MCP integration
│   ├── mcp_server.py       # MCP server implementation
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── app/                # Next.js app directory
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes for MCP communication
│   │   └── index.tsx       # Main application page
│   ├── styles/             # CSS styles
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

### Customizing the UI

The frontend uses Tailwind CSS for styling. Modify the components in the `frontend/app` directory to customize the UI.

## Troubleshooting

- **Method Not Allowed Error**: Ensure your API endpoints are using the correct HTTP methods
- **Connection Issues**: Check that both the backend and frontend are running and can communicate
- **Authentication Errors**: Verify your Gemini API key is correctly set in the `.env` file

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) for the protocol specification
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [Next.js](https://nextjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Google Gemini API](https://ai.google.dev/) for AI capabilities

<div style="text-align: center">⁂</div>

[^1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/50445731/f60e7cf6-dccb-41a8-8bbc-e0b5f931c259/README.md
[^2]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/50445731/7f29c965-99ce-4193-9751-851de49fd093/llms-full.txt
[^3]: https://dev.to/jagroop2001/lets-build-an-ai-twitter-post-project-using-gemini-api-nextjs-and-tailwindcss-3194
[^4]: https://www.linkedin.com/pulse/integrating-ai-web-apps-nextjs-fastapi-llms-majid-sheikh-of2hc
[^5]: https://vercel.com/templates/next.js/nextjs-fastapi-starter
[^6]: https://blog.stackademic.com/connect-your-gemini-ai-with-a-database-using-ai-tools-3fc5d6b774f2
[^7]: https://www.youtube.com/watch?v=IFQI3t89eO8
[^8]: https://generativeai.pub/creating-a-dynamic-skill-quiz-api-with-fastapi-and-gemini-google-ai-add26e631908
[^9]: https://www.youtube.com/watch?v=G5h0K9HnINU
[^10]: https://www.youtube.com/watch?v=g566eI2EmeY
[^11]: https://github.com/808vita/gemini-api-nextjs-api-routes
[^12]: https://www.linkedin.com/posts/aveek-goyal_ai-aidevelopment-opensource-activity-7274752918782664704-t-WF
[^13]: https://github.com/apappascs/mcp-servers-hub
[^14]: https://www.youtube.com/watch?v=6CgeNtJwKFs
