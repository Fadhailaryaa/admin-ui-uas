import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { auth } from "../firebase";

const INITIAL_STATE = {
  currentUser: null,
};

const storedUser = localStorage.getItem("user");

if (storedUser) {
  try {
    INITIAL_STATE.currentUser = JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("user");
  }
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.currentUser]);

  return <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>{children}</AuthContext.Provider>;
};