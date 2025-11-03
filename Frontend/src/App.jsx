import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`function App() {
  return <h1>Hello Code Reviewer!</h1>
}`);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy Review");

  const reviewCode = async () => {
    setLoading(true);
    setReview("");
    try {
      setCopyStatus("Copy Review");

      const response = await axios.post("https://code-review-7gfl.onrender.com/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview("Error: Could not fetch review. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (review) {
      navigator.clipboard
        .writeText(review)
        .then(() => {
          setCopyStatus("Copied!");

          setTimeout(() => {
            setCopyStatus("Copy Review");
          }, 2000);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          setCopyStatus("Failed to copy!");
          setTimeout(() => {
            setCopyStatus("Copy Review");
          }, 2000);
        });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-5/12 p-6 bg-black text-white flex flex-col border-r border-white">
        <h1 className="text-2xl font-extrabold mb-4 text-white">Code Input</h1>

        <div className="flex-grow overflow-hidden border border-white rounded-lg shadow-xl bg-gray-950">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => <span>{code}</span>}
            padding={16}
            className="h-full font-mono text-sm"
            style={{ minHeight: "calc(100vh - 12rem)" }}
          />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800">
          <button
            onClick={reviewCode}
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            } 
              px-4 py-3 rounded-lg text-white font-bold transition shadow-xl transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50`}
          >
            {loading ? "Reviewing Code..." : "Get AI Review"}
          </button>
        </div>
      </div>

      <div className="w-7/12 p-6 bg-black overflow-y-auto">
        <h1 className="text-2xl font-extrabold mb-4 text-white border-b border-white pb-2">
          Review Output
        </h1>

        <div className="mt-4 p-4 rounded-lg bg-gray-950 border-white shadow-inner relative">
          {/* 3. The Copy Button */}
          {review && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-4 text-xs px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition disabled:opacity-50"
              disabled={
                copyStatus === "Copied! 🎉" || copyStatus === "Failed to copy!"
              }
            >
              {copyStatus}
            </button>
          )}

          {loading && (
            <p className="text-center text-gray-400 animate-pulse">
              Analyzing your code. This may take a moment...
            </p>
          )}
          {review && (
            <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-200 font-sans pt-6">
              {review}
            </div>
          )}
          {!loading && !review && (
            <p className="text-center text-gray-500 italic">
              Your AI code review will appear here after you click the **Get AI
              Review** button.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
