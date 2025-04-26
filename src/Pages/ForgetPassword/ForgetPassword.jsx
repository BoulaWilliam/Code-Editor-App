import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleReset(e) {
        e.preventDefault();

        if (!username) {
            toast.error("Username is required.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Requesting password reset...");

        try {
            const response = await axios.post(
                "https://gradapi.duckdns.org/request-password-reset",
                { username }
            );

            console.log("Password reset response:", response.data); // 🖨️ log the response here

            if (response.data.statusCode === 200) {
                toast.success(`Reset link sent to: ${response.data.email}`);
                navigate("/resetPassword", { state: { username } });
            } else {
                toast.error(response.data.errorMessage || "Something went wrong.");
                console.error("Unexpected API response:", response.data);
            }
        } catch (error) {
            const message = error.response?.data?.errorMessage || "Server error.";
            toast.error(message);
            console.error("Request error:", error);
        } finally {
            setLoading(false);
            toast.dismiss(toastId);
        }
    }

    return (
        <div className="flex items-center justify-center mt-60 text-white">
            <form
                onSubmit={handleReset}
                className="bg-[#4B4B4B] p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#08AEED] to-[#09E190] bg-clip-text text-transparent">
                    Request Password Reset
                </h2>

                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-6 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#08AEED]"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white py-3 rounded hover:scale-105 transition-transform"
                >
                    {loading ? "Sending..." : "Request Reset"}
                </button>
            </form>
        </div>
    );
}
