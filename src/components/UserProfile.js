import axios from 'axios';
import React, { useState } from 'react';
import UserFavorites from './UserFavorites';

const UserProfile = ({
  user,
  showUserProfile,
  handleLogout,
  handleDelete,
  setCurrentUser,
  handleLeaveRoom,
}) => {
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  //   const [toggleUserProfile, setShowUserProfile] = useState(false);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updateAvatar = (event) => {
    setAvatar(event.target.value);
  };

  const closeModal = (event) => {
    showUserProfile(false);
    // setShowUserProfile(false);
  };

  const submitChanges = (event) => {
    if (user.room) handleLeaveRoom();
    const userObj = { username: username, avatar: avatar, id: user.id };
    updateUsernameAndAvatar(userObj);
  };

  const updateUsernameAndAvatar = (userObj) => {
    axios
      .put(
        `https://thawing-scrubland-60943.herokuapp.com/users/${user.username}`,
        userObj
      )
      .then((res) => {
        if (res.data.username) {
          setUsername(res.data.username);
          setAvatar(res.data.avatar);
          setCurrentUser(res.data);
          showUserProfile(false);
        } else {
          //   setToggleError(true);
          //   setErrorMessage(res.data);
        }
      });
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center">
      <div
        className="w-screen h-full absolute bg-black bg-opacity-20 z-0"
        onClick={closeModal}
      ></div>
      <div className="bg-gradient-to-r from-red-200 via-red-300 to-red-400 w-3/4 opacity-100 bg-opacity-100 border rounded-md shadow-md absolute p-2 mb-4">
        <div className="w-40 border-2 border-black rounded-full">
          <img
            src={avatar}
            alt={`${user.username}'`}
            className="w-full rounded-full"
          ></img>
        </div>
        <h1 className="text-5xl">{username}</h1>

        <div>
          <h2>Change Username:</h2>
          <form>
            <input
              type="text"
              onChange={updateUsername}
              className="border-b-2 border-black bg-white bg-opacity-50 "
            ></input>
          </form>
        </div>
        <div>
          <h2>Change Profile Pic:</h2>
          <form>
            <input
              type="text"
              onChange={updateAvatar}
              className="border-b-2 border-black bg-white bg-opacity-50 "
            ></input>
          </form>
          <div>
            <button
              className="bg-black text-white px-2 rounded-lg m-2 cursor-pointer"
              onClick={submitChanges}
            >
              Submit Changes
            </button>
            <button
              className="bg-black text-white px-2 rounded-lg m-2 cursor-pointer"
              onClick={() => showUserProfile(false)}
            >
              Close Menu
            </button>
          </div>
          <div className="w-full bg-black flex text-white justify-around rounded-sm">
            <button
              onClick={handleLogout}
              className="w-1/2 hover:bg-white hover:text-black"
            >
              Logout
            </button>
            <button
              onClick={handleDelete}
              className="w-1/2 hover:bg-white hover:text-black"
            >
              Delete User
            </button>
          </div>
        </div>
        <UserFavorites></UserFavorites>
      </div>
    </div>
  );
};

export default UserProfile;
