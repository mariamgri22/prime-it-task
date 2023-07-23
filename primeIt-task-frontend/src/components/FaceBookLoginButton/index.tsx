import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useAppDispatch } from "../../store/store";
import { changeLoginMethod } from "../../redux/authSlice";

const FacebookLoginButton = () => {
  const [loginURL, setLoginURL] = useState("");

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchLoginURL = async () => {
      try {
        const response = await axios.get("/api/facebook-login-url");
        setLoginURL(response.data.loginURL);
      } catch (error) {
        console.log("Error fetching login URL:", error);
      }
    };

    fetchLoginURL();
  }, []);

  const handleLoginWithFacebook = () => {
    dispatch(changeLoginMethod("fb"));
    window.location.href = loginURL;
  };

  return (
    <div>
      <button id="fbButton" onClick={handleLoginWithFacebook}>
        {" "}
        Log In With Facebook{" "}
      </button>
    </div>
  );
};

export default FacebookLoginButton;
