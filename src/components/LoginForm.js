import React, { useState } from 'react';

const UserLoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const triggerLogin = (event) => {
    event.preventDefault();
    let userObj = { username: username, password: password };
    props.handleLogin(userObj);
  };

  return (
    <div className="loginFormContainer">
      <h1>Login</h1>
      <form onSubmit={triggerLogin}>
        <h2>Username</h2>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <h2>Password</h2>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {props.toggleError ? <h5>{props.errorMessage}</h5> : null}

        <input type="submit" value="login" />
      </form>
    </div>
  );
};

export default UserLoginForm;
