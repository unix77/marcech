import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch((error) => {
      console.error('Initially something is wrong when trying to authorize', error);
      setIsAuthorized(false);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN); // get refresh token from local storage
    try {
      const res = await api.post("/api/token/refresh/", { refresh: refreshToken }); // send it to the backend to get a new access token
      if(res.status == 200) { // if all was ok, I will set the new acces token in the local storage
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
      return false;
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; //we get the date in seconds

    if(tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
    return false;
  }

  if(isAuthorized == null) { // this means that we are still checking if the user is authorized
    return <div>Loading...</div> // this will be displayed while we are checking the authorization
  }

  return isAuthorized ? children : <Navigate to="/login" />; // if the user is authorized, we render the children, otherwise we redirect to the login page
}


export default ProtectedRoute;
