import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userContext } from '../../Contexts/UserContext/User.context';
import toast from 'react-hot-toast';

export default function CreateFile() {
    const { token } = useContext(userContext);
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [fileId, setFileId] = useState(null);
    const [fileDetails, setFileDetails] = useState(null);
    const [shareCode, setShareCode] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const api = axios.create({
        baseURL: 'https://gradapi.duckdns.org',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const handleCreate = async () => {
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/file', { fileName, fileContent });
            setFileId(data.fileId);
            setFileDetails(data);
            toast.success('File created successfully!');
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
            toast.error(`Error: ${err.response?.data?.errorMessage || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRead = async () => {
        setLoading(true);
        setError('');
        try {
            const { data } = await api.get(`/file`, {
                params: { fileId },
            });
            setFileDetails(data);
            toast.success('File details fetched successfully!');
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
            toast.error(`Error: ${err.response?.data?.errorMessage || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const { data } = await api.patch('/file', {
                fileId,
                newFileName: fileName,
                newFileContent: fileContent,
            });
            setFileDetails(data);
            toast.success('File updated successfully!');
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
            toast.error(`Error: ${err.response?.data?.errorMessage || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { data } = await api.delete('/file', { data: { fileId } });
            if (data.isDeleted) {
                toast.success('File deleted successfully');
                setFileId(null);
                setFileDetails(null);
                setShareCode(null);
                setFileName('');
                setFileContent('');
            }
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
            toast.error(`Error: ${err.response?.data?.errorMessage || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        setLoading(true);
        try {
            const { data } = await api.post('/share', { fileId });
            setShareCode(data.fileShareCode);
            toast.success('File shared successfully!');
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
            toast.error(`Error: ${err.response?.data?.errorMessage || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mb-52 flex items-center justify-center flex-grow'>
            <div className="max-w-3xl mx-auto bg-[#4B4B4B] p-8 shadow-lg shadow-[#292828] rounded-xl mt-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Create New File</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="File name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <textarea
                        placeholder="File content"
                        className="w-full p-3 border border-gray-300 rounded-md h-40"
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#08AEED] to-[#09E190] transition text-white py-2 rounded-md font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create File'}
                    </button>

                    {error && <p className="text-red-600 font-medium">❌ {error}</p>}

                    {fileId && (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4 text-white">File Options</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button onClick={handleRead} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">🔍 Read</button>
                                <button onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">✏️ Update</button>
                                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">🗑️ Delete</button>
                                <button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">🔗 Share</button>
                            </div>
                        </div>
                    )}

                    {fileDetails && (
                        <div className="mt-6 bg-gray-100 p-4 rounded-md">
                            <h4 className="text-lg font-semibold mb-2">📄 File Details</h4>
                            <pre className="text-sm whitespace-pre-wrap break-words">
                                {JSON.stringify(
                                    Object.fromEntries(
                                        Object.entries(fileDetails).filter(
                                            ([key]) => key !== 'statusCode' && key !== 'fileSize'
                                        )
                                    ),
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    )}

                    {shareCode && (
                        <div className="mt-4 bg-blue-100 p-4 rounded-md text-blue-700 font-semibold">
                            🔗 Share Code: {shareCode}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
