import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://the-floating-library-server-production.up.railway.app/users/user",
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export { UserContext, UserProvider };
