import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../Contexts/UserContext/User.context";

export default function ReadFiles() {
  const { token } = useContext(userContext);
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibW9kaSIsInN1YiI6Im1vZGkiLCJ1c2VybmFtZSI6Im1vZGkiLCJqdGkiOiJiNTk4YzQ5OS0zMDQ3LTQyZjAtYjcxMC1mMDIwN2FlYTljYjgiLCJleHAiOjE3NDU2OTM0NTcsImlzcyI6Im1lIn0.trm49o_q4lOk_H3QU1Us0nwzQo98Oez7tne9DL_jMCU";

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      // Sending the GET request with the correct headers and no body
      const res = await axios.get("https://gradapi.duckdns.org/file/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If the response is successful, set the files
      return res.data.files;
    } catch (err) {
      // Handle errors (both network and API-related)
      setError(
        err.response?.data?.errorMessage || "Unexpected error: " + err.message
      );
    } finally {
      setLoading(false); // Stop loading once the request is complete
    }
  };

  useEffect(() => {
    fetchFiles().then((files) => {
      setFiles(files);
    });
  }, [token]);

  return (
    <>
      <div className="container flex items-center mb-64 justify-center flex-grow ">
        <div className="max-w-4xl mx-auto mt-10 p-6  rounded-xl bg-[#4B4B4B] shadow-[#292828] shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">All Files</h2>
          {error && <div className="text-red-500 mb-4">❌ {error}</div>}

          {loading ? (
            <div className="text-center text-[#08AEED]">Loading...</div> // Loading indicator
          ) : (
            <ul className="space-y-4">
              {files.map((file) => (
                <li
                  key={file.fileId}
                  className="p-4 bg-gray-100 rounded shadow"
                >
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
