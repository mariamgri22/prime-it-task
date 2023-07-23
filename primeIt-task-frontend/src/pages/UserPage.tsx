import User from "../components/User/User";
import { UserFromRegister } from "../components/User/UserFromRegister";
import UserFromFaceBook from "../components/User/UserFromFaceBook";
import { useAppSelector } from "../store/store";
import './style.css'

const UserPage = () => {
  const { loginMethod } = useAppSelector((state) => state.auth);
  return (
    <div className="userContainer">
      <span className="userSpan">Welcome to your Profile!</span>
      {loginMethod === "login" && <User />}
      {loginMethod === "register" && <UserFromRegister />}
      {loginMethod === "fb" && <UserFromFaceBook />}
    </div>
  );
};
export default UserPage;
