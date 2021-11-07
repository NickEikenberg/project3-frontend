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

  const updateAvatar = (event) => {
    event.preventDefault();

    setAvatar(event.target.value);
  };

  const closeModal = (event) => {
    showUserProfile(false);
    // setShowUserProfile(false);
    event.preventDefault();
    console.log(user);
    console.log('hello world');
    let userObj = { username: username, avatar: avatar, id: user.id };
    updateUsername(userObj);
  };

  const updateUsername = (userObj) => {
    if (userObj.username || userObj.avatar) {
      axios
        .put(
          `http://thawing-scrubland-60943.herokuapp.com/users/${user.username}`,
          userObj
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
    }
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center">
      <div
        className="w-screen h-full absolute bg-black bg-opacity-20 z-0"
        onClick={closeModal}
      ></div>
      <div className="bg-white w-1/2 h-1/2 opacity-100 bg-opacity-100 border rounded-md shadow-md absolute p-2">
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
              //   value={user.avatar}
              onChange={updateAvatar}
            ></input>
            <input
              type="submit"
              value="submit"
              className="cursor-pointer"
            ></input>
          </form>
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
