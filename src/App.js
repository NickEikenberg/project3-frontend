import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import NewUserForm from './components/NewUserForm';
import JoinRoomForm from './components/JoinRoomForm';
import Room from './components/Room';

const App = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleLogout, setToggleLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleCreateUser = (userObj) => {
    axios.post('http://localhost:3001/users/new', userObj).then((res) => {
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
    axios.put('http://localhost:3001/users/login', userObj).then((res) => {
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
      .delete(`http://localhost:3001/users/${currentUser.username}`)
      .then((res) => {
        if (res.data.username) {
          setCurrentUser({});
          handleToggleLogout();
        } else {
          setToggleError(true);
          setErrorMessage(res.data);
        }
      });
  };

  const handleLogout = () => {
    setCurrentUser({});
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

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <header>
        <h1 className="text-2xl">Exquisite Corpse</h1>
      </header>
      <div>
        {toggleLogout ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDelete}>Delete User</button>
          </div>
        ) : (
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
              class="accountBtn text-center hover:underline"
            >
              {toggleLogin ? 'Need an account?' : 'Already have an account?'}
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
  );
};

export default App;
