import { useState, useRef } from 'react';
import axios from 'axios';

import Header from './components/Header';
import LoginForm from './components/LoginForm';
import NewUserForm from './components/NewUserForm';
import JoinRoomForm from './components/JoinRoomForm';
import Room from './components/Room';

import UserProfile from './components/UserProfile';

import UserWelcome from './components/UserWelcome';
import Rules from './components/Rules';

const App = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleLogout, setToggleLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showUserProfile, setShowUserProfile] = useState(false);

  const toggleSetShowUserProfile = () => {
    setShowUserProfile(!showUserProfile);
  };

  const handleCreateUser = (userObj) => {
    console.log(userObj);
    axios
      .post('http://thawing-scrubland-60943.herokuapp.com/users/new', userObj)
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
      .put('http://thawing-scrubland-60943.herokuapp.com/users/login', userObj)
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
        `http://thawing-scrubland-60943.herokuapp.com/users/${currentUser.username}`
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

  const handleLeaveRoom = () => {
    currentUser.socket.close();
    setCurrentUser({ ...currentUser, room: '', socket: null });
  };

  const handleLogout = () => {
    setCurrentUser({});
    if (currentUser.socket) currentUser.socket.close();
    handleToggleLogout();

    setShowUserProfile(false);
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

  return (
    <div className="flex flex-col items-center m-6 bg-gray-50 rounded-md">
      <Header showUserProfile={setShowUserProfile} user={currentUser}></Header>
      <UserWelcome
        user={currentUser}
        showUserProfile={toggleSetShowUserProfile}
      ></UserWelcome>
      <Rules />
      {showUserProfile ? (
        <div className="h-screen">
          <UserProfile
            user={currentUser}
            showUserProfile={toggleSetShowUserProfile}
            handleLogout={handleLogout}
            handleDelete={handleDelete}
            setCurrentUser={setCurrentUser}
            handleLeaveRoom={handleLeaveRoom}
          ></UserProfile>
        </div>
      ) : (
        <div className="flex flex-col items-center h-screen w-full border border-black rounded-sm lg:w-3/4 mb-6 ">
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
            <div class="loggedInDiv w-full">
              {currentUser.room ? (
                <Room
                  user={currentUser}
                  setUser={setCurrentUser}
                  handleLeave={handleLeaveRoom}
                />
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
