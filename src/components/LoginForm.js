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
      <h1 className="text-center text-xl">Login</h1>
      <form onSubmit={triggerLogin} className="flex flex-col">
        <h2>Username</h2>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="border-b-2 border-black"
          id="input-user"
        />
        <h2>Password</h2>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="border-b-2 border-black"
          id="input-password"
        />
        {props.toggleError ? <h5>{props.errorMessage}</h5> : null}

        <input
          type="submit"
          value="Login"
          className="btn my-4 cursor-pointer bg-blue-400 text-white rounded-xl   hover:bg-blue-500 focus:bg-blue-600"
        />
      </form>
    </div>
  );
};

export default UserLoginForm;
