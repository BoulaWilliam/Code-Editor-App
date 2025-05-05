import React, { useState } from 'react';
import axios from 'axios';

export default function ReadSharedFile() {
    const [code, setCode] = useState('');
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [newFileContent, setNewFileContent] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleRead = async () => {
        setFileData(null);
        setError('');
        setUpdateSuccess(false);
        try {
            const { data } = await axios.get('https://gradapi.duckdns.org/share', {
                params: { fileShareCode: code },
            });
            setFileData(data);
            setNewFileName(data.fileName);
            setNewFileContent(data.fileContent);
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
        }
    };

    const handleUpdate = async () => {
        setError('');
        setUpdateSuccess(false);
        try {
            const { data } = await axios.patch('https://gradapi.duckdns.org/share', {
                fileShareCode: code,
                newFileName: newFileName || null,
                newFileContent: newFileContent || null,
            });
            setFileData(data);
            setUpdateSuccess(true);
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
        }
    };

    return (
        <div className="container flex items-center justify-center  flex-grow">
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#4B4B4B] shadow-[#292828] rounded-xl shadow-lg w-full">
                <h2 className="text-2xl font-bold my-4 text-white">Read Shared File</h2>

                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter Share Link"
                    className="w-full p-3 bg-[#2F2F2F] text-white border border-gray-600 rounded-[12px] placeholder-gray-400"
                />

                <button
                    onClick={handleRead}
                    className="bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white px-12 py-2 my-4 rounded-[10px]"
                >
                    Fetch File
                </button>

                {error && <div className="mt-4 text-red-400 font-semibold">❌ {error}</div>}
                {updateSuccess && <div className="mt-4 text-green-400 font-semibold">✅ File updated successfully!</div>}

                {fileData && (
                    <div className="mt-6 bg-[#3A3A3A] p-4 rounded shadow text-sm text-white">
                        <h3 className="text-lg font-bold mb-2">{fileData.fileName}</h3>
                        <p className="text-gray-300 mb-2">
                            Size: {(fileData.fileSizeInBytes / 1024).toFixed(2)} KB
                        </p>
                        <code className="block bg-[#2F2F2F] p-3 rounded mb-4 whitespace-pre-wrap">
                            {fileData.fileContent}
                        </code>

                        <h3 className="text-md font-semibold mb-2">✏️ Edit File</h3>
                        <input
                            type="text"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="New File Name"
                            className="w-full p-3 mb-3 bg-[#2F2F2F] text-white border border-gray-600 rounded placeholder-gray-400"
                        />
                        <textarea
                            rows={6}
                            value={newFileContent}
                            onChange={(e) => setNewFileContent(e.target.value)}
                            placeholder="New File Content"
                            className="w-full p-3 bg-[#2F2F2F] text-white border border-gray-600 rounded placeholder-gray-400"
                        />
                        <button
                            onClick={handleUpdate}
                            className="mt-4 bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white px-12 py-2 rounded-[10px]"
                        >
                            Update File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
