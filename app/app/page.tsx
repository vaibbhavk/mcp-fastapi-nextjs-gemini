"use client";

import { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";

export default function Home() {
  const [tools, setTools] = useState([]);
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch available MCP tools when the component mounts
    const fetchMcpData = async () => {
      try {
        const toolsResponse = await fetch(
          "http://localhost:8000/api/mcp/tools"
        );
        const toolsData = await toolsResponse.json();
        setTools(toolsData.tools);
      } catch (error) {
        console.error("Error fetching MCP data:", error);
      }
    };

    fetchMcpData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateText = async () => {
    if (!textPrompt.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/gemini-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textPrompt }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error generating text:", error);
      setResult("Error: Failed to generate text");
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || !imagePrompt.trim()) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const response = await fetch("/api/gemini-analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: base64Data, prompt: imagePrompt }),
        });
        const data = await response.json();
        setResult(data.result);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Error: Failed to analyze image");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Next.js + FastAPI + MCP + Gemini Integration
        </h1>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {["Text Generation", "Image Analysis", "Available Tools"].map(
              (category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                  ${
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  }`
                  }
                >
                  {category}
                </Tab>
              )
            )}
          </Tab.List>

          <Tab.Panels className="mt-4">
            <Tab.Panel className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Generate Text with Gemini
              </h2>
              <textarea
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              />
              <button
                onClick={generateText}
                disabled={loading}
                className={`mt-4 px-4 py-2 rounded-md text-white font-medium transition-colors
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Generating..." : "Generate Text"}
              </button>
            </Tab.Panel>

            <Tab.Panel className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Analyze Image with Gemini
              </h2>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors"
                >
                  Select Image
                </button>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-[200px] rounded-md border border-gray-300"
                    />
                  </div>
                )}
                <textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="What would you like to know about this image?"
                  className="w-full mt-4 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                />
              </div>
              <button
                onClick={analyzeImage}
                disabled={loading || !selectedImage}
                className={`px-4 py-2 rounded-md text-white font-medium transition-colors
                  ${
                    loading || !selectedImage
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Analyzing..." : "Analyze Image"}
              </button>
            </Tab.Panel>

            <Tab.Panel className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Available MCP Tools
              </h2>
              <ul className="space-y-2">
                {tools.map((tool, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <strong className="font-medium">{tool.name}</strong>
                      <p className="text-gray-600">{tool.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {result && (
          <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Result:</h3>
            <div className="whitespace-pre-wrap text-gray-700">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}
