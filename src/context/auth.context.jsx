import { useState, useEffect, createContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  //Get the sotred token from the local storage and send a request to the API
  function authenticateUser () {
    const storedToken = localStorage.getItem("authToken");

    //If the token exists in the localStorage we send a request to the API
    if (storedToken) {
      fetch(`${API_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //Handling the response from the API
          setIsLoggedIn(true);
          setUser(data);
          setGroup(data.group);
          setIsLoading(false);
        })
        .catch((error) => {
          //Handling the error
          console.error("Error:", error);
          setIsLoggedIn(false);
          setUser(null);
          setGroup(null);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setGroup(null);
      setIsLoading(false);
    }
  };
  //upon logout remove the token from the local storage and set the user to null
  const logOutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    setIsLoggedIn(false);
    setUser(null);
  };
  //To be updated in the next step
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logOutUser,
        storeToken,
        authenticateUser,
        group
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
