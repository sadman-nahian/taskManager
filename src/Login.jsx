import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const Login = ({setUser}) => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login">
      <h2 className="login--header">Task Manager</h2>
      <button onClick={handleSignIn} className="login--button">
        Sign in
      </button>
      <small className="login--text">user must sign in to use app</small>
    </div>
  );
};

export default Login;
