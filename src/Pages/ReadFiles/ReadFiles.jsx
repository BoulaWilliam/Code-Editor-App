import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { userContext } from '../../Contexts/UserContext/User.context';

export default function ReadFiles() {
    const { token } = useContext(userContext);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true); // Start loading
            setError(''); // Clear any previous errors
            try {
                // Sending the GET request with the correct headers and no body
                const res = await axios.get('https://gradapi.duckdns.org/file/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // If the response is successful, set the files
                setFiles(res.data.files);
            } catch (err) {
                // Handle errors (both network and API-related)
                setError(err.response?.data?.errorMessage || 'Unexpected error: ' + err.message);
            } finally {
                setLoading(false); // Stop loading once the request is complete
            }
        };

        fetchFiles();
    }, [token]);

    return (    
        <>
        <div className='container flex items-center justify-center flex-grow'>
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">All Files</h2>
            {error && <div className="text-red-500 mb-4">❌ {error}</div>}

            {loading ? (
                <div className="text-center">Loading...</div> // Loading indicator
            ) : (
                <ul className="space-y-4">
                    {files.map((file) => (
                        <li key={file.fileId} className="p-4 bg-gray-100 rounded shadow">
                            <div className="font-semibold">{file.fileName}</div>
                            <div className="text-sm text-gray-600">
                                Size: {(file.fileSizeInBytes / 1024).toFixed(2)} KB
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
        </>
    );
}
