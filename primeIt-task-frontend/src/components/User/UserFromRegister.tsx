import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const UserFromRegister = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };
  return (
    <div>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email} </p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
