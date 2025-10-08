import React, { createContext, useState } from "react";
import { email } from "zod";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: ""
    },  
    password: "",
  });

  return (
    <>
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    </>
  )
}

export default UserContext;