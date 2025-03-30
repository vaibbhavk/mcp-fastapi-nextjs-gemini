from mcp.server.fastmcp import FastMCP, Context
import google.generativeai as genai
import os
from typing import Optional
import base64
from io import BytesIO
from PIL import Image as PILImage

# Create a named MCP server
mcp = FastMCP("Gemini MCP")

# Configure Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Define Gemini text generation tool
@mcp.tool()
async def generate_text(prompt: str, temperature: Optional[float] = 0.7, max_tokens: Optional[int] = 1024) -> str:
    """Generate text using Google's Gemini API."""
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(prompt, 
                                     generation_config={
                                         "temperature": temperature,
                                         "max_output_tokens": max_tokens
                                     })
    return response.text

# Define Gemini image analysis tool
@mcp.tool()
async def analyze_image(image_data: str, prompt: str) -> str:
    """Analyze an image using Gemini's multimodal capabilities.
    
    Args:
        image_data: Base64 encoded image data
        prompt: Text prompt describing what to analyze in the image
    """
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    # Decode base64 image
    image_bytes = base64.b64decode(image_data)
    image = PILImage.open(BytesIO(image_bytes))
    
    # Generate response from Gemini
    response = model.generate_content([prompt, image])
    return response.text

# Define Gemini chat tool
@mcp.tool()
async def chat_with_gemini(messages: list, temperature: Optional[float] = 0.7) -> str:
    """Have a multi-turn conversation with Gemini.
    
    Args:
        messages: List of message objects with 'role' and 'content' keys
        temperature: Controls randomness (0.0 to 1.0)
    """
    model = genai.GenerativeModel('gemini-2.0-flash')
    chat = model.start_chat(history=[])
    
    # Add messages to chat
    for msg in messages:
        if msg['role'] == 'user':
            chat.send_message(msg['content'])
        # Skip assistant messages as they're already part of the history
    
    # Get the last response
    response = chat.last
    return response.text

# Define some resources
@mcp.resource("config://app")
def get_app_config() -> str:
    """Get application configuration."""
    config = {
        "name": "NextJS-FastAPI App",
        "version": "1.0.0",
        "environment": os.environ.get("ENVIRONMENT", "development")
    }
    return json.dumps(config, indent=2)

@mcp.resource("users://{user_id}/profile")
def get_user_profile(user_id: str) -> str:
    """Get user profile data"""
    # This would typically come from a database
    profiles = {
        "1": {"name": "John Doe", "email": "john@example.com"},
        "2": {"name": "Jane Smith", "email": "jane@example.com"}
    }
    if user_id in profiles:
        return json.dumps(profiles[user_id], indent=2)
    return json.dumps({"error": "User not found"})

# Define a prompt template
@mcp.prompt()
def analyze_data(data: str) -> str:
    """Create a prompt to analyze data."""
    return f"""Please analyze the following data and provide insights:

{data}

Focus on key patterns, anomalies, and actionable insights.
"""

if __name__ == "__main__":
    # Run the server directly for testing
    mcp.run()
