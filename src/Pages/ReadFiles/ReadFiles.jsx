
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, Pencil, Trash2, Share2, ArrowRight } from 'lucide-react';
import { userContext } from '../../Contexts/UserContext/User.context';
import toast from 'react-hot-toast';

export default function ReadFiles() {
    const { token } = useContext(userContext);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [shareCode, setShareCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'https://gradapi.duckdns.org',
        headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
        fetchFiles();
    }, [token]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await api.get('/file/all');
            setFiles(res.data.files);
        } catch (err) {
            setError(err.response?.data?.errorMessage || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRead = async (fileId) => {
        try {
            const res = await api.get('/file', { params: { fileId } });
            setSelectedFile({ ...res.data, fileId });
            setEditMode(false);
        } catch (err) {
            toast.error(err.response?.data?.errorMessage || 'Failed to read file');
        }
    };

    const handleUpdate = async () => {
        try {
            const { fileId, fileName, fileContent } = selectedFile;
            await api.patch('/file', {
                fileId,
                newFileName: fileName,
                newFileContent: fileContent,
            });
            toast.success('File updated successfully');
            setSelectedFile(null);
            fetchFiles();
        } catch (err) {
            toast.error(err.response?.data?.errorMessage || 'Failed to update file');
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await api.delete('/file', { data: { fileId } });
            toast.success('File deleted successfully');
            setSelectedFile(null);
            fetchFiles();
        } catch (err) {
            toast.error(err.response?.data?.errorMessage || 'Failed to delete file');
        }
    };

    const handleShare = async (fileId) => {
        try {
            const res = await api.post('/share', { fileId });
            setShareCode(res.data.fileShareCode);
            toast.success('File shared!');
        } catch (err) {
            toast.error(err.response?.data?.errorMessage || 'Failed to share file');
        }
    };

    const renderFileDetails = () => (
        <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">📄 File Details</h3>
            <input
                className="w-full p-2 mb-2 bg-gray-700 rounded-md"
                value={selectedFile.fileName}
                onChange={(e) => setSelectedFile({ ...selectedFile, fileName: e.target.value })}
                disabled={!editMode}
            />
            <textarea
                className="w-full h-40 p-2 bg-gray-700 rounded-md"
                value={selectedFile.fileContent}
                onChange={(e) => setSelectedFile({ ...selectedFile, fileContent: e.target.value })}
                disabled={!editMode}
            />
            <div className="mt-4 flex gap-4 flex-wrap">
                {editMode ? (
                    <button
                        onClick={handleUpdate}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        💾 Save Changes
                    </button>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        ✏️ Edit
                    </button>
                )}
                <button
                    onClick={() => setSelectedFile(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                    ❌ Close
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-screen min-h-screen text-white px-4 py-10 overflow-auto">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-white mb-12 mt-[50px] text-center">
                    All Files
                </h2>

                {error && <div className="text-red-400 text-center mb-6">❌ {error}</div>}

                {loading ? (
                    <div className="text-center text-[#08AEED] text-lg font-semibold">Loading...</div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {files.map((file) => (
                            <div
                                key={file.fileId}
                                className="relative aspect-square bg-white/90 rounded-2xl p-6 flex flex-col justify-between items-center text-gray-800 shadow-md hover:shadow-2xl hover:shadow-[#08AEED] transition-transform"
                            >
                                <FileText size={48} className="text-[#08AEED] mb-2" />
                                <div className="text-center text-base font-semibold truncate w-full">
                                    {file.fileName}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {(file.fileSizeInBytes / 1024).toFixed(2)} KB
                                </div>
                                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                                    <button
                                        onClick={() => handleRead(file.fileId)}
                                        className="bg-blue-100 p-2 rounded"
                                    >
                                        <Eye size={18} className="text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleRead(file.fileId);
                                            setEditMode(true);
                                        }}
                                        className="bg-yellow-100 p-2 rounded"
                                    >
                                        <Pencil size={18} className="text-yellow-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.fileId)}
                                        className="bg-red-100 p-2 rounded"
                                    >
                                        <Trash2 size={18} className="text-red-600" />
                                    </button>
                                    <button
                                        onClick={() => handleShare(file.fileId)}
                                        className="bg-indigo-100 p-2 rounded"
                                    >
                                        <Share2 size={18} className="text-indigo-600" />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/code/${file.fileId}`)}
                                        className="bg-green-100 p-2 rounded"
                                    >
                                        <ArrowRight size={18} className="text-green-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedFile && renderFileDetails()}

                {shareCode && (
                    <div className="mt-6 text-center text-blue-400 font-semibold">
                        🔗 Share Code: {shareCode}
                    </div>
                )}
            </div>
        </div>
    );
}
