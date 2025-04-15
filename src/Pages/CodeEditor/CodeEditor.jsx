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
    <div className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full h-fit bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6 shadow-2xl">
        <h3
          className="text-2xl font-bold mb-6 text-center cursor-pointer"
          onClick={() => setIsLanguageOpen(prev => !prev)}
        >
          Languages
        </h3>

        {isLanguageOpen && (
          <div className="mt-4 flex flex-col gap-4">
            {Object.keys(defaultSnippets).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex items-center gap-3 text-lg px-4 py-2 rounded-xl transition-all duration-300 ${
                  language === lang
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'hover:bg-gray-700'
                }`}
              >
                <i className={`${languageIcons[lang]} text-xl`} />
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* Main Panel */}
      <main className="flex-1 w-full flex flex-col gap-6">
        {/* Code Box */}
        <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-800 bg-gray-900 text-green-100 font-mono text-sm">
          <div className="flex">
            {/* Line numbers */}
            <div className="bg-gray-800 text-right px-4 py-4 select-none text-gray-500">
              {lines.map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
            {/* Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[400px] p-4 bg-transparent focus:outline-none resize-none overflow-auto"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleCompile}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Compiling...' : 'Run Code'}
          </button>

          <button
            onClick={() => navigate('/CreateFile')}
            className="self-start bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg transition disabled:opacity-50">

            Create File
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-white text-gray-800 rounded-2xl border border-gray-300 p-6 min-h-[100px] shadow-xl">
          <h4 className="text-lg font-semibold mb-2">Output:</h4>
          <div className="whitespace-pre-wrap text-sm">
            {output || (error && `❌ ${error}`) || 'No output yet.'}
          </div>
        </div>
      </main>
    </div>
  );
}
