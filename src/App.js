import { useState, useRef } from 'react';
import axios from 'axios';

import Header from './components/Header';
import LoginForm from './components/LoginForm';
import NewUserForm from './components/NewUserForm';
import JoinRoomForm from './components/JoinRoomForm';
import Room from './components/Room';
import UserAvatarUpload from './components/UserAvatarUpload';
import UserProfile from './components/UserProfile';
import UserFavorites from './components/UserFavorites';

const App = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleLogout, setToggleLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [toggleAvatarUpload, setToggleAvatarUpload] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleCreateUser = (userObj) => {
    console.log(userObj);
    axios
      .post('http://localhost:3001/users/new', userObj)
      .then((res) => {
        if (res.data.username) {
          setToggleError(false);
          setErrorMessage('');
          setCurrentUser(res.data);
          handleToggleLogout();
        } else {
          setErrorMessage(res.data);
          setToggleError(true);
        }
      });
  };

  const handleLogin = (userObj) => {
    axios
      .put('http://localhost:3001/users/login', userObj)
      .then((res) => {
        if (res.data.username) {
          setToggleError(false);
          setErrorMessage('');
          setCurrentUser(res.data);
          handleToggleLogout();
        } else {
          setToggleError(true);
          setErrorMessage(res.data);
        }
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:3001/users/${currentUser.username}`
      )
      .then((res) => {
        if (res.data.username) {
          setCurrentUser({});
          handleToggleLogout();
        } else {
          setToggleError(true);
          setErrorMessage(res.data);
        }
      });

    setShowUserProfile(false);
  };

  const handleLogout = () => {
    setCurrentUser({});
    if (currentUser.socket) currentUser.socket.close();
    handleToggleLogout();
  };

  const handleToggleForm = () => {
    setToggleError(false);
    if (toggleLogin === true) {
      setToggleLogin(false);
    } else {
      setToggleLogin(true);
    }
  };

  const handleToggleLogout = () => {
    if (toggleLogout) {
      setToggleLogout(false);
    } else {
      setToggleLogout(true);
    }
  };

  const handleToggleAvatarUpload = () => {
    setToggleAvatarUpload(true);
  };

  return (
    <div className="flex flex-col items-center m-6 bg-gray-50">
      <Header showUserProfile={setShowUserProfile} user={currentUser}></Header>

      {showUserProfile ? (
        <div className="h-screen">
          <UserProfile
            user={currentUser}
            showUserProfile={setShowUserProfile}
            handleLogout={handleLogout}
            handleDelete={handleDelete}
            setCurrentUser={setCurrentUser}
          ></UserProfile>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="">
            {toggleLogout ? null : (
              <div>
                {toggleLogin ? (
                  <LoginForm
                    handleLogin={handleLogin}
                    toggleError={toggleError}
                    errorMessage={errorMessage}
                  />
                ) : (
                  <NewUserForm
                    handleCreateUser={handleCreateUser}
                    toggleError={toggleError}
                    errorMessage={errorMessage}
                    toggleAvatarUpload={handleToggleAvatarUpload}
                  />
                )}
                <button
                  onClick={handleToggleForm}
                  className="accountBtn text-center hover:underline"
                >
                  {toggleLogin
                    ? 'Need an account?'
                    : 'Already have an account?'}
                </button>
              </div>
            )}
          </div>
          {currentUser.username && (
            <div class="loggedInDiv">
              <div className="flex justify-between">
                <h1>Hi, {currentUser.username}! </h1>

                <span>
                  <div className="ml-3 relative">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={currentUser.avatar}
                      alt={`${currentUser.username}'s avatar'`}
                    ></img>
                  </div>
                </span>
              </div>

              {currentUser.room ? (
                <Room user={currentUser} setUser={setCurrentUser} />
              ) : (
                <JoinRoomForm user={currentUser} setUser={setCurrentUser} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
