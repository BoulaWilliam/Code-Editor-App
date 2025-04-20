import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../../Contexts/UserContext/User.context';
import { useNavigate } from 'react-router-dom'; // ⬅️ added

const defaultSnippets = {
  javascript: `console.log("Hello, JavaScript!");`,
  python: `print("Hello, Python!")`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, C++!" << endl;\n  return 0;\n}`,
  csharp: `using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, C#!");\n  }\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`
};

const languageIcons = {
  javascript: 'fab fa-js',
  python: 'fab fa-python',
  cpp: 'fab fa-cuttlefish',
  csharp: 'fab fa-microsoft',
  java: 'fab fa-java'
};

export default function CodeEditor() {
  const { token } = useContext(userContext);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultSnippets['javascript']);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLanguageOpen, setIsLanguageOpen] = useState(true);
  const navigate = useNavigate(); // ⬅️ added

  useEffect(() => {
    setCode(defaultSnippets[language]);
  }, [language]);

  const handleCompile = async () => {
    setLoading(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('https://gradapi.duckdns.org/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ language, codeToRun: code })
      });

      const data = await response.json();
      if (response.ok) {
        setOutput(data.output);
      } else {
        setError(data.errorMessage);
      }
    } catch (err) {
      setError('Unexpected error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const lines = code.split('\n');

  return (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <aside className="w-16 bg-[#1e1e1e] flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center gap-6">
        {/* Logo placeholder */}
        <div className="w-6 h-6 bg-cyan-500 rounded-full" />
        {/* Select Language Button */}
        <button
          onClick={() => setIsLanguageOpen(prev => !prev)}
          className="text-xs bg-gray-800 text-white py-1 px-2 rounded-md shadow"
        >
          + Select Language
        </button>
      </div>
    </aside>

    {/* Code and Output Sections */}
    <div className="flex flex-1">
      {/* Left - Input */}
      <div className="w-1/2 bg-[#4b4b4b] text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Input</h2>

        {/* Expand icons (fake placeholders as per screenshot) */}
        <div className="space-y-4 mb-4">
          <span className="block text-2xl">&gt;</span>
          <span className="block text-2xl">&gt;</span>
        </div>

        {/* Editor */}
        <div className="bg-[#2d2d2d] rounded-lg border border-gray-600 overflow-hidden">
          <div className="flex">
            <div className="bg-gray-800 text-right px-4 py-4 select-none text-gray-400">
              {lines.map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[400px] p-4 bg-transparent text-green-100 focus:outline-none resize-none overflow-auto"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleCompile}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
          >
            {loading ? 'Compiling...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Right - Output */}
      <div className="w-1/2 bg-[#111111] text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Output</h2>
        <div className="bg-black rounded-lg p-4 min-h-[300px] text-sm whitespace-pre-wrap">
          {output || (error && `❌ ${error}`) || 'No output yet.'}
        </div>
      </div>
    </div>
  </div>
);

}
