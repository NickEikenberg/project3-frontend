import React, { useState } from 'react';

const userLoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const triggerLogin = (event) => {
    event.preventDefault();
    let userObj = { username: username, password: password };
    // props.handleLogin(userObj)
  };

  return (
    <div className="loginFormContainer">
      <h1>Login</h1>
    </div>
  );
};
