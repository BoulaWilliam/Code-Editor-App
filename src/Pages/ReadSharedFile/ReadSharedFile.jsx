import React, { useState } from 'react';
import axios from 'axios';

export default function ReadSharedFile() {
    const [code, setCode] = useState('');
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState('');

    const handleRead = async () => {
        setFileData(null);
        setError('');
        try {
            const { data } = await axios.get('https://gradapi.duckdns.org/share', {
                params: {
                    fileShareCode: code, // send the code as a query parameter
                },
            });

            setFileData(data);
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
        }
    };

    return (
        <>
        <div className='container flex items-center justify-center mb-52 flex-grow'>
        <div className="max-w-3xl  mx-auto mt-10 p-6 bg-[#4B4B4B] shadow-[#292828] rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold my-4 text-white">Read Shared File</h2>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="   Enter Share Link "
                className="w-full p-2 border my-4 rounded-[12px]"
            />
            <button
                onClick={handleRead}
                className="bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white px-12 py-2 my-4 rounded-[10px]"
            >
                Fetch File
            </button>
            {error && <div className="mt-4 text-red-500">❌ {error}</div>}
            {fileData && (
                <div className="mt-6 bg-gray-100 p-4 rounded shadow text-sm whitespace-pre-wrap">
                    <h3 className="text-lg font-bold mb-2">{fileData.fileName}</h3>
                    <p className="text-gray-500 mb-2">
                        Size: {(fileData.fileSizeInBytes / 1024).toFixed(2)} KB
                    </p>
                    <code>{fileData.fileContent}</code>
                </div>
            )}
        </div>
        </div>
        </>
    );
}
