import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function Chatbot() {
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        fetch('https://gradapi.duckdns.org/ai/models')
            .then(res => res.json())
            .then(data => setModels(data.allModels))
            .catch(err => console.error('Error fetching models:', err));
    }, []);

    const handleSend = async () => {
        if (!message.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('https://gradapi.duckdns.org/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: selectedModel || null, message })
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Code copied to clipboard!');
    };

    const handleTextareaInput = () => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    };

    const renderResponse = (text) => {
        const codeRegex = /```([\s\S]*?)```/g;
        const parts = text.split(codeRegex);
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return (
                    <div key={index} className="relative">
                        <pre className="bg-[#2D2D2D] p-4 rounded text-sm overflow-x-auto text-green-400">
                            <code>{part}</code>
                        </pre>
                        <button
                            onClick={() => copyToClipboard(part)}
                            className="absolute top-2 right-2 text-xs bg-[#08AEED] hover:bg-[#09E190] text-white px-2 py-1 rounded"
                        >
                            Copy
                        </button>
                    </div>
                );
            } else {
                return <p key={index} className="text-gray-300 whitespace-pre-wrap">{part}</p>;
            }
        });
    };

    return (
        <div className="container flex items-center justify-center text-start flex-grow mt-20 px-4">
            <div className="bg-[#4B4B4B] rounded-lg shadow-lg shadow-[#292828] p-8 w-full max-w-4xl text-gray-200">
                <h1 className="text-4xl font-bold text-center mb-6 text-white">
                    What Can I Help With?
                </h1>

                <div className="space-y-4">
                    <div className="relative">
                        <select
                            className="w-full bg-[#08AEED] text-white p-3 rounded"
                            value={selectedModel}
                            onChange={e => setSelectedModel(e.target.value)}
                        >
                            <option value="">Select Model</option>
                            {models.map((model, idx) => (
                                <option key={idx} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            className="w-full pl-4 pr-12 text-black placeholder-gray-400 p-3 rounded resize-none overflow-hidden"
                            placeholder="Ask anything"
                            value={message}
                            onChange={e => {
                                setMessage(e.target.value);
                                handleTextareaInput();
                            }}
                            onInput={handleTextareaInput}
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white px-4 py-1 rounded hover:scale-105 transition-transform"
                            disabled={loading}
                        >
                            {loading ? '...' : '➤'}
                        </button>
                    </div>

                    {response && (
                        <div className="bg-gray-800 p-4 rounded text-white space-y-4">
                            <strong className="text-lg">Response:</strong>
                            {renderResponse(response)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
