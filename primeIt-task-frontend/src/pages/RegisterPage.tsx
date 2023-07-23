import { useNavigate } from "react-router-dom";
import Register from "../components/Register/Register";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/profile");
  };

  return (
    <div>
      <Register onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
