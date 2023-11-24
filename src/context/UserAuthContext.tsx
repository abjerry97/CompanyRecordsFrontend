import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth"; 
import app, { auth } from "../firebase"; 
import { makeRequest } from "../axios";

export const userAuthContext = createContext<any | null>(null);

export const UserAuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  
  function logIn(email: string, password: string) { 
    getIdToken()
    const newUser = signInWithEmailAndPassword(auth, email, password);
    return newUser
  } 

  async function signUp(
    email: string,
    password: string,
    data: any, 
  ) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(newUser.user, { displayName: data?.fullName }); 
    getIdToken()
    return newUser;
  }

  function logOut() {
    
    localStorage.removeItem("idToken");
    return signOut(auth);
  }

  async function getProfile() {
    const res = await makeRequest.get("user/profile");
    if (res.data && res.status < 400) {
      setUserProfile(res.data);
      return res.data;
    } else
    return null
    //  throw new Error(res.data?.response?.message);
  }
  function getIdToken() {
    auth?.currentUser
      ?.getIdToken(true)
      .then(function (idToken) { 
        localStorage.setItem("idToken", idToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser: any) => {
      setUser(currentuser);
    });
    getIdToken()
   if(user) getProfile()
    return () => {
      unsubscribe();
    };
  },[]);

  return (
    <userAuthContext.Provider value={{ user, userProfile,logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(userAuthContext);
}
