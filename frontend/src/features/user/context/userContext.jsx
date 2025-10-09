import React, { createContext, useState } from "react";


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
        <UserDataContext.Provider value={{ user: userData, setUser: setUserData }}>
            {children}
        </UserDataContext.Provider>
    </>
  )
}

export default UserContext;