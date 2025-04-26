import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username || ""; // ✅ Get username passed from ForgetPassword

    async function handleUpdatePassword(e) {
        e.preventDefault();

        if (!username || !code || !newPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Resetting password...");

        try {
            const response = await axios.post(
                "https://gradapi.duckdns.org/reset-password",
                {
                    code,
                    username,
                    newPassword,
                }
            );

            console.log("Reset password response:", response.data); // 🖨️ Print the response

            if (response.data.statusCode === 200) {
                toast.success("Password reset successfully!");
                navigate("/login"); // ✅ Go back to login
            } else {
                toast.error(response.data.errorMessage || "Password reset failed.");
                console.error("API error:", response.data);
            }
        } catch (error) {
            const message = error.response?.data?.errorMessage || "Something went wrong.";
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
                onSubmit={handleUpdatePassword}
                className="bg-[#4B4B4B] p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#08AEED] to-[#09E190] bg-clip-text text-transparent">
                    Reset Your Password
                </h2>

                <input
                    type="text"
                    value={username}
                    readOnly
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white opacity-70 focus:outline-none"
                />

                <input
                    type="text"
                    placeholder="Enter reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#08AEED]"
                />

                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 mb-6 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#08AEED]"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white py-3 rounded hover:scale-105 transition-transform"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
