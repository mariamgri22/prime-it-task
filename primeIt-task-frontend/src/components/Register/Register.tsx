import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../store/store";
import {
  changeLoginMethod,
  registerAsync,
  registerSuccess,
} from "../../redux/authSlice";
import FacebookLoginButton from "../FaceBookLoginButton";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  onRegisterSuccess: () => void;
}
const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login");
    dispatch(changeLoginMethod("login"));
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      repeatPassword: yup
        .string()
        .required("Repeat Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        await registerAsync({
          username: values.username,
          email: values.email,
          password: values.password,
        });

        dispatch(
          registerSuccess({ username: values.username, email: values.email })
        );

        onRegisterSuccess();
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div>{formik.errors.username}</div>
          )}
        </div>
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
        <div>
          <label>Repeat Password:</label>
          <input
            type="password"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <div>{formik.errors.repeatPassword}</div>
          )}
        </div>
        <button type="submit">Register</button>
        <span>Already have account?</span>
        <button onClick={handleNavigateLogin}>Login</button>
      </form>
      <span>or</span>
      <FacebookLoginButton />
    </div>
  );
};

export default Register;
