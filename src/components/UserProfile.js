import axios from 'axios';
import React, { useState } from 'react';
import UserFavorites from './UserFavorites';

const UserProfile = ({
  user,
  showUserProfile,
  handleLogout,
  handleDelete,
  setCurrentUser,
}) => {
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  //   const [toggleUserProfile, setShowUserProfile] = useState(false);

  let prevUsername = username;
  let prevAvatar = avatar;

  const updateAvatar = (event) => {
    event.preventDefault();
    setAvatar(event.target.value);
  };

  const closeModal = (event) => {
    event.preventDefault();
    showUserProfile(false);
    // setShowUserProfile(false);
  };

  const submitChanges = (event) => {
    event.preventDefault();
    showUserProfile(false);

    let userObj = { username: username, avatar: avatar, id: user.id };
    updateUsernameAndAvatar(userObj);
  };

  const updateUsernameAndAvatar = (userObj) => {
    if (userObj.username || userObj.avatar) {
      axios
        .put(
          `http://thawing-scrubland-60943.herokuapp.com/users/${user.username}`,
          { username: prevUsername, avatar: prevAvatar, id: user.id }
        )
        .then((res) => {
          console.log(res);
          if (res.data.username) {
            setUsername(res.data.username);
            setAvatar(res.data.avatar);
            setCurrentUser(res.data);
          } else {
            //   setToggleError(true);
            //   setErrorMessage(res.data);
          }
        });
    } else {
      axios
        .put(
          `http://thawing-scrubland-60943.herokuapp.com/users/${user.username}`,
          userObj
        )
        .then((res) => {
          if (res.data.username) {
            setUsername(res.data.username);
            setAvatar(res.data.avatar);
            setCurrentUser(res.data);
          } else {
            //   setToggleError(true);
            //   setErrorMessage(res.data);
          }
        });
    }
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center">
      <div
        className="w-screen h-full absolute bg-black bg-opacity-20 z-0"
        onClick={closeModal}
      ></div>
      <div className="bg-gradient-to-r from-red-200 via-red-300 to-red-400 w-3/4 h-3/4 opacity-100 bg-opacity-100 border rounded-md shadow-md absolute p-2 mb-4">
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
              required
              placeholder={user.username}
              onChange={(event) => setUsername(event.target.value)}
              className="border-b-2 border-black bg-white bg-opacity-50 "
            ></input>
          </form>
        </div>
        <div>
          <h2>Change Profile Pic:</h2>
          <form onSubmit={setAvatar}>
            <input
              type="text"
              required
              //   value={user.avatar}
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
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDelete}>Delete User</button>
          </div>
        </div>
        <UserFavorites></UserFavorites>
      </div>
    </div>
  );
};

export default UserProfile;
