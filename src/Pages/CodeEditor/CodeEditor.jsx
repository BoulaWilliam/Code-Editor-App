import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext/User.context";
import { motion } from "framer-motion";
import gsap from "gsap";
import Logo from "../../assets/Logo.png";
import { Play, Save } from "lucide-react";
import toast from "react-hot-toast";

import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const { token } = useContext(userContext);
  const { fileId, isShared } = useParams();
  const isSharedBool = isShared === "true";

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const svgRef = useRef(null);

  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Python", value: "python" },
    { name: "C++", value: "cpp" },
    { name: "C#", value: "csharp" },
    { name: "Java", value: "java" },
  ];

  const defaultSnippets = {
    javascript: `console.log("Hello, JavaScript!");`,
    python: `print("Hello, Python!")`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, C++!" << endl;\n  return 0;\n}`,
    csharp: `using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, C#!");\n  }\n}`,
    java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`,
  };

  useEffect(() => {
    if (!fileId) {
      setCode(defaultSnippets[language] || "");
    }
  }, [language, fileId]);

  const fetchFile = async () => {
    try {
      const response = await fetch(
        `https://gradapi.duckdns.org/file?fileId=${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || "Failed to load file.");
      }

      setCode(data.fileContent);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchSharedFile = async () => {
    try {
      const response = await fetch(
        `https://gradapi.duckdns.org/share?fileShareCode=${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || "Failed to load file.");
      }

      setCode(data.fileContent);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!fileId || !token) return;
    if (isSharedBool) {
      fetchSharedFile();
    } else {
      fetchFile();
    }
  }, [fileId, token]);

  useEffect(() => {
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const handleCompile = async () => {
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch("https://gradapi.duckdns.org/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ language, codeToRun: code }),
      });
      const data = await response.json();
      if (response.ok) setOutput(data.output);
      else setOutput(`❌ ${data.errorMessage}`);
    } catch (err) {
      setOutput("❌ Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSharedFileSave = async () => {
    if (!fileId || !token) return;
    setSaving(true);
    try {
      const response = await fetch("https://gradapi.duckdns.org/share", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileShareCode: fileId,
          newFileContent: code,
        }),
      });
      const data = await response.json();
      toast.success("Shared File Saved Successfuly!");
      if (!response.ok) throw new Error(data.errorMessage || "Save failed.");
    } catch (err) {
      toast.error("❌ Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!fileId || !token) return;
    setSaving(true);
    try {
      const response = await fetch("https://gradapi.duckdns.org/file", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileId,
          newFileContent: code,
        }),
      });
      const data = await response.json();
      toast.success("File Saved Successfuly!");
      if (!response.ok) throw new Error(data.errorMessage || "Save failed.");
    } catch (err) {
      toast.error("❌ Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  return (
    <section className="code">
      <div className="w-screen h-screen bg-[#444444] text-white flex flex-col px-4">
        <motion.div
          className="flex flex-1 overflow-hidden flex-col lg:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Sidebar */}
          <motion.div
            className="w-full lg:w-[250px] border-r-2 border-white bg-[#505050] shadow-lg shadow-[#444444] flex flex-col items-center justify-start px-4 py-4 gap-4"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={Logo}
              alt="Logo"
              className="w-[60px] h-[60px] object-cover rounded-full hidden lg:flex self-start"
            />
            <div className="w-full">
              <label className="text-[1rem] bg-[#3E3E3E] py-2 font-semibold block">
                + Select Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-sm bg-[#3E3E3E] text-white px-2 py-1 focus:outline-none"
              >
                {languages.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Animated SVG */}
            <motion.svg
              className="hidden lg:block w-full max-w-[180px] h-auto mt-4"
              viewBox="0 0 180 406"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <path
                ref={svgRef}
                d="M338.83 304.36L200.201 281.366C196.744 280.793 193.198 281.147 189.922 282.39C186.646 283.633 183.758 285.722 181.551 288.444L93.0076 397.574C80.1767 413.373 54.723 401.914 58.0437 381.834L81.0366 243.183C81.609 239.726 81.2556 236.179 80.0122 232.903C78.7689 229.627 76.68 226.739 73.9581 224.533L-35.1721 135.989C-50.9703 123.158 -39.5114 97.7046 -19.4319 101.025L119.215 124.028C122.672 124.6 126.219 124.246 129.495 123.003C132.771 121.76 135.659 119.671 137.865 116.949L226.405 7.82811C239.236 -7.97002 264.689 3.48888 261.369 23.5684L238.366 162.216C237.794 165.672 238.148 169.219 239.391 172.495C240.634 175.771 242.723 178.659 245.445 180.865L354.575 269.409C370.373 282.24 358.914 307.694 338.835 304.373"
                stroke="url(#paint0_linear_2141_67)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2141_67"
                  x1="249.944"
                  y1="2.24414"
                  x2="69.4595"
                  y2="403.154"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#08AEED" />
                  <stop offset="1" stopColor="#09E190" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>

          {/* Main Code Area */}
          <div className="flex flex-col lg:flex-row flex-1 overflow-auto">
            <motion.div
              className="flex-1 bg-[#555555] p-4 md:p-6 flex flex-col relative shadow-lg shadow-[#444444] min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-[1.8rem]">Input</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCompile}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#08AEED] to-[#09E190] hover:opacity-90 px-3 py-2 rounded text-white font-bold text-sm flex items-center gap-2"
                  >
                    <Play size={16} />
                    {loading ? "Running..." : "Run"}
                  </button>
                  {fileId && (
                    <button
                      onClick={isSharedBool ? handleSharedFileSave : handleSave}
                      disabled={saving}
                      className="bg-gradient-to-r from-[#08AEED] to-[#09E190] hover:opacity-90 px-3 py-2 rounded text-white font-bold text-sm flex items-center gap-2"
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save"}
                    </button>
                  )}
                </div>
              </div>
              <div className="h-full">
                <Editor
                  height="100%"
                  defaultLanguage={language}
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    fontFamily: "monospace",
                    lineNumbers: "on",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="flex-1 bg-[#000] overflow-auto p-4 md:p-6 shadow-lg shadow-[#444444] min-h-[200px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-base md:text-lg flex items-start font-semibold mb-2">
                Output
              </h2>
              <div className="flex bg-[#333333] rounded overflow-hidden">
                <div className="w-12 bg-[#2a2a2a] text-right text-gray-400 p-2 select-none text-xs leading-6 overflow-hidden font-mono">
                  <pre>
                    {Array.from(
                      {
                        length: (
                          output || "// Output will be displayed here."
                        ).split("\n").length,
                      },
                      (_, i) => i + 1
                    ).join("\n")}
                  </pre>
                </div>
                <pre className="flex-1 p-2 text-green-400 whitespace-pre-wrap break-words overflow-auto text-sm md:text-base font-mono">
                  {output || "// Output will be displayed here."}
                </pre>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
