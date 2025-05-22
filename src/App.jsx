import React, { useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./Login.jsx"
import Task from "./Task.jsx"

const App = () => {
  const [user,setUser]=useState(null);
  const handleSignOut = () => {
  signOut(auth)
    .then(() => setUser(null))
    .catch((error) => console.log("Sign out error:", error));
};

  return (
    <div className='container'>
      {
        !user ?(<Login setUser={setUser} />):
         <div >
          <div className='user--info'>
            
          <img className='user--image' src={user.photoURL} alt="profile"  />
          
          <button className='button--signout' onClick={handleSignOut}>sign out</button>
          </div>
          
          <Task user={user} />
        </div>
      }
    </div>
  )
}

export default App