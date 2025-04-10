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
                toast.success("User Created Successfully!");
                localStorage.setItem("userToken", data.token);
                setToken(data.token);
                setTimeout(() => {
                    navigate("/code");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
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
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md text-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
            <i className="fa-regular fa-circle-user"></i> Login Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded focus:ring-2 focus:ring-purple-500"
                />
                {formik.touched.username && formik.errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                        {formik.errors.username}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded focus:ring-2 focus:ring-purple-500"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {formik.errors.password}
                    </p>
                )}
            </div>

            {/* Login Button */}
            <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded transition-transform transform hover:scale-105"
                disabled={formik.isSubmitting}
            >
                Login
            </button>

            {/* Register Link */}
            <NavLink
                to="/register"
                className="block text-center text-gray-300 hover:text-gray-100 mt-2"
            >
                Don't Have an Account?
            </NavLink>
        </form>
    </div>
    );
}
