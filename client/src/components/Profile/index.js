import React from "react";

const Profile = ({ authUser }) => {
  console.log(authUser);
  return (
    <div className="profile-box">
      <div className="profile-box-text">nickname: {authUser.nickname}</div>
      <div className="profile-box-text">email: {authUser.email}</div>
      <div className="profile-box-text">role: {authUser.role}</div>
    </div>
  );
};

export default Profile;
