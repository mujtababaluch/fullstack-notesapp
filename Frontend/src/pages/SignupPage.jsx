import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../services/AuthService";

function SignupPage() {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await signup(values.username, values.email, values.password);
        setMessage(data.message);
        resetForm();
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold">Signup</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Enter username"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-sm text-red-600">{formik.errors.username}</p>
        )}
        <input
          type="email"
          placeholder="Enter email"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-600">{formik.errors.email}</p>
        )}
        <input
          type="password"
          placeholder="Enter password"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          {...formik.getFieldProps("password")}
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
          Signup
        </button>
      </form>
      {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}
    </div>
  );
}

export default SignupPage;
