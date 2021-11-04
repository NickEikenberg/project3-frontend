import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import NewUserForm from './components/NewUserForm';

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
    <div>
      <header>
        <h1>Exquisite Corpse</h1>
      </header>
      <div>
        {toggleLogout ? (
          <button onClick={handleLogout} class="logoutBtn">
            Logout
          </button>
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
            <button onClick={handleToggleForm} class="accountBtn">
              {toggleLogin ? 'Need an account?' : 'Already have an account?'}
            </button>
          </div>
        )}
      </div>
      {currentUser.username && (
        <div class="loggedInDiv">
          <h1>
            This entire div will only show if a user is currently logged in
          </h1>
          <h2>
            So you could show profile info, or whatever else you want to be
            authentication protected!
          </h2>
          <h3>And you could even stick other React components in here!</h3>
        </div>
      )}
    </div>
  );
};

export default App;
