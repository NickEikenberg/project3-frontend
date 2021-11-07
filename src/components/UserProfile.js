import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="w-screen h-full absolute bg-black bg-opacity-20 flex flex-col justify-center items-center">
      <div className="bg-white w-1/2 h-1/2 opacity-100 bg-opacity-100 border rounded-md shadow-md">
        <div>
          <img src={user.avatar} alt={`${user.username}'s avatar'`}></img>
        </div>
        <h1>{user.username}'s profile:</h1>

        <h2>{user.username}</h2>
      </div>
    </div>
  );
};

export default UserProfile;
