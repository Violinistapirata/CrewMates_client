import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const navigate= useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);



  //Get the stored token from the local storage and send a request to the API
  function authenticateUser () {
    const storedToken = localStorage.getItem("authToken");

    //If the token exists in the localStorage we send a request to the API
    if (storedToken) {
      let responseStatus;
      // This fetch is to verify the token and get the token payload (the user info)
      fetch(`${API_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        }
      })
        .then((response) => {
          responseStatus = response.status;
          return response.json()
        })
        // This fetch is to get the user info from the database to get the users group if it has been created
        .then((data) => fetch(`/users/${data._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
        }))
        .then((response) => {
          responseStatus = response.status;
          return response.json()
        })
        .then(user =>
          // data es user. contiene un id
          // return 
          //Handling the response from the API
          if (responseStatus === 200){
            setIsLoggedIn(true);
            console.log(data);
            setUserInfo(data);
            setIsLoading(false);
          }
        )
        /*
        .then(response el usuario incluyendo el group){
        // cont user = {_id: respose.id, groupId: response.groupID}
        // si la response ya incluye el objeto que queremos la ponemos directamente en setUserInfo
        // setUserInfo())
        }
        */
        .catch((error) => {
          //Handling the error
          console.error("Error:", error);
          setIsLoggedIn(false);
          setUserInfo(null);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
      setIsLoading(false);
    }
  };

  //upon logout remove the token from the local storage and set the user to null
  const logOutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    setIsLoggedIn(false);
    setUserInfo(null);

    navigate("/sign-up"); //<Navigate> can not be used here
  };
 
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userInfo,
        setUserInfo,
        logOutUser,
        authenticateUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
