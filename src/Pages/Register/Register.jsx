import { useFormik } from "formik";
import { object, string, boolean } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

// Google Image
import Google from '../../assets/Google.png';

export default function Register() {
    const navigate = useNavigate();

    const validationSchema = object({
        username: string()
            .required("Username is Required")
            .min(3, "Username Must Be At Least 3 Chars!")
            .max(25, "Username Can't Be More Than 25 Chars!"),
        email: string()
            .required("Email is Required!")
            .email("Must be a valid email!"),
        password: string().required("Password is Required!"),
        terms: boolean().oneOf([true], "You must accept the terms and conditions"),
    });

    async function sendDataToRegister(values) {
        const loadingToastId = toast.loading("Waiting...");
        try {
            const { data } = await axios.post("https://gradapi.duckdns.org/register", {
                username: values.username,
                email: values.email,
                password: values.password,
            });
    
            if (data.statusCode === 200) {
                toast.success("User Created Successfully!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                if (data.errorMessage?.toLowerCase().includes("email")) {
                    toast.error("Email already exists.");
                } else {
                    toast.error(data.errorMessage || "Registration failed.");
                }
            }
        } catch (error) {
            const msg = error.response?.data?.errorMessage;
            if (msg?.toLowerCase().includes("email")) {
                toast.error("Email already exists.");
            } else {
                toast.error("Network error. Please try again.");
            }
        } finally {
            toast.dismiss(loadingToastId);
        }
    }
    

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            terms: false,
        },
        validationSchema,
        onSubmit: sendDataToRegister,
    });

    return (
        <div className="container flex items-center justify-center flex-grow mt-32">
            <div className="bg-[#4B4B4B] rounded-lg shadow-[0_4px_8px_#00000029] p-8 w-full max-w-md text-gray-200">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#08AEED] to-[#09E190] bg-clip-text text-transparent">
                    <i className="fa-regular fa-circle-user text-white"></i> Register Now
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
                            <p className="text-red-600 text-md mt-1">{formik.errors.username}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="email"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className="w-full pl-10 text-black placeholder-gray-400 p-3 rounded"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
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
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center text-sm text-gray-300">
                        <input
                            type="checkbox"
                            id="terms"
                            {...formik.getFieldProps("terms")}
                            className="mr-2 accent-[#08AEED]"
                        />
                        <label htmlFor="terms">
                            I agree to the <span className="text-[#09E190] hover:underline cursor-pointer">terms and conditions</span>
                        </label>
                    </div>
                    {formik.touched.terms && formik.errors.terms && (
                        <p className="text-red-500 text-sm">{formik.errors.terms}</p>
                    )}

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#08AEED] to-[#09E190] text-white py-3 rounded transition-transform transform hover:scale-105"
                        disabled={formik.isSubmitting}
                    >
                        <i className="fas fa-user-plus mr-2"></i> Sign Up
                    </button>

                    {/* Sign in with Google */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="w-10 h-10 flex items-center justify-center rounded hover:scale-125 transition-all duration-200"
                        >
                            <img
                                src={Google}
                                alt="Sign in with Google"
                                className="w-[40px] object-cover"
                            />
                        </button>
                    </div>

                    {/* Already Have Account */}
                    <NavLink
                        to="/login"
                        className="block text-center text-gray-300 hover:text-gray-100 mt-4 text-sm"
                    >
                        Already have an account?{" "}
                        <span className="text-[#08AEED] hover:underline">Login</span>
                    </NavLink>
                </form>
            </div>
        </div>
    );
}
