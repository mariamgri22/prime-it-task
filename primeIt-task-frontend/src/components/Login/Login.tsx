import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../store/store";
import {
  changeLoginMethod,
  loginAsync,
  loginSuccess,
} from "../../redux/authSlice";
import FacebookLoginButton from "../FaceBookLoginButton";
import { useNavigate } from "react-router-dom";
import "../Register/style.css";

interface LoginProps {
  onLoginSuccess: () => void;
}
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNavigateRegister = () => {
    navigate("/register");
    dispatch(changeLoginMethod("register"));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(
          loginAsync({ email: values.email, password: values.password })
        );

        dispatch(loginSuccess({ email: values.email }));

        onLoginSuccess();
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Login</button>
        <span>Not account yet?</span>
        <button onClick={handleNavigateRegister}>Register</button>
      </form>
      <span>or</span>
      <FacebookLoginButton />
    </div>
  );
};

export default Login;
