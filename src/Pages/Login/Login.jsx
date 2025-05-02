import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext/User.context";

export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useContext(userContext);

    const validationSchema = object({
        username: string()
            .required("Username is Required")
            .min(3, "Username Must Be At Least 3 Chars!")
            .max(25, "Username Can't Be More Than 25 Chars!"),
        password: string().required("Password is Required!"),
    });

    async function sendDataToLogin(values) {
        const loadingToastId = toast.loading("Waiting...");
        try {
            const { data } = await axios.post(
                "https://gradapi.duckdns.org/login",
                values
            );

            if (data.statusCode === 200) {
                toast.success("User Logged In Successfully!");
                localStorage.setItem("userToken", data.token);
                setToken(data.token);
                setTimeout(() => {
                    navigate("/code");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        } finally {
            toast.dismiss(loadingToastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: sendDataToLogin,
    });

    return (
        <>
            <div className="container flex items-center justify-center flex-grow mt-32">
                <div className="bg-[#4B4B4B] rounded-lg shadow-lg shadow-[#292828] p-8 w-full max-w-md text-gray-200">
                    <h2 className="text-3xl  font-bold text-center mb-6 bg-gradient-to-r from-[#08AEED] to-[#09E190] bg-clip-text text-transparent">
                        <i className="fa-regular fa-circle-user  text-white"></i> Login
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="relative">
                            <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                {...formik.getFieldProps("username")}
                                className="w-full pl-10 text-black placeholder-gray-400 p-3 rounded focus:text-[#08AEED]"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className="text-red-600 text-md mt-1">
                                    {formik.errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                                className="w-full pl-10 text-black placeholder-gray-400 p-3 rounded"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me + Forgot Password */}
                        <div className="flex items-center justify-between text-sm text-gray-300">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-[#08AEED]" />
                                <span>Remember Me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => navigate("/forgetPassword")}
                                className="hover:underline text-[#09E190] cursor-pointer bg-transparent border-none p-0"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white py-3 rounded transition-transform transform hover:scale-105"
                            disabled={formik.isSubmitting}
                        >
                            <i className="fas fa-sign-in-alt mr-2"></i> Login
                        </button>

                        {/* OR Divider */}
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-white" />
                            <span className="mx-2 text-white text-md">OR</span>
                            <hr className="flex-grow border-white" />
                        </div>


                        {/* Don't have account */}
                        <NavLink
                            to="/register"
                            className="block text-center text-gray-300 hover:text-gray-100 mt-4 text-sm"
                        >
                            Don’t have an account? <span className="text-[#08AEED] hover:underline">Sign up</span>
                        </NavLink>
                    </form>

                </div>
            </div>
        </>
    );
}
