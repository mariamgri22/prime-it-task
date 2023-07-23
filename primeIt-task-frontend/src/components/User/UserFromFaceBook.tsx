import { useEffect, useState } from "react";
import axios from "axios";

const UserFromFaceBook = () => {

  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/me");        
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
   
     <div>
      {profileData ? (
        <div>
          <p>Username: {profileData.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
};

export default UserFromFaceBook;