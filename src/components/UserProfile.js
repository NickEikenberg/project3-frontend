import React, { useState } from 'react';

const UserProfile = ({ user, showUserProfile }) => {
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const [toggleUserProfile, setShowUserProfile] = useState(false);

  const updateAvatar = (event) => {
    event.preventDefault();

    setAvatar(event.target.value);
  };

  const updateUsername = (event) => {
    event.preventDefault();

    setUsername(event.target.value);
  };

  const closeModal = (event) => {
    setShowUserProfile(false);
    event.preventDefault();
    console.log('hello world');
  };

  return (
    <div
      className="w-screen h-full absolute bg-black bg-opacity-20 flex flex-col justify-center items-center"
      onClick={closeModal}
    >
      <div className="bg-white w-1/2 h-1/2 opacity-100 bg-opacity-100 border rounded-md shadow-md">
        <div className="w-40">
          <img src={avatar} alt={`${user.username}'`} className="w-full"></img>
        </div>
        <h1 className="text-5xl">{username}</h1>

        <div>
          <h2>Change Username:</h2>
          <form>
            <input
              type="text"
              placeholder={user.username}
              onChange={(event) => setUsername(event.target.value)}
            ></input>
          </form>
        </div>
        <div>
          <h2>Change Profile Pic:</h2>
          <form onSubmit={setAvatar}>
            <input
              type="text"
              value={user.avatar}
              onSubmit={updateAvatar}
            ></input>
            <input
              type="submit"
              value="submit"
              className="cursor-pointer"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
