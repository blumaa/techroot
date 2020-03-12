// src/components/Home/auth.js
import React from 'react';
import Profile from '../Profile/index'
function AuthHome({authUser}) {
  console.log(authUser)
  return (
    <>
      <h1>Home</h1>
      <p>You are logged in</p>
      <Profile authUser={authUser}/>
    </>
  )
}
export default AuthHome;
