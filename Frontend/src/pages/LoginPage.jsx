import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../services/AuthService";

function LoginPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await login(values.email, values.password);
        sessionStorage.setItem("token", data.data.token);
        navigate("/", { replace: true });
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  if (sessionStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold">Login</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 flex flex-col gap-3"
      >
        <input
          type="email"
          placeholder="Enter email"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        )}
        <input
          type="password"
          placeholder="Enter password"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-600">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          className={`text-white text-sm px-5 py-2 rounded-lg ${
            formik.isValid ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Login
        </button>
      </form>
      {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}
    </div>
  );
}

export default LoginPage;
