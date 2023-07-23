import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../token";
import Cookies from "js-cookie";

const User = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await api.get("/user");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("bearerToken");
    navigate("/register");
  };

  return (
    <div>
      <p>Username: {profileData?.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;
