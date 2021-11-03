import React, { useState } from 'react';

const NewUserForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const triggerCreateUser = (event) => {
    event.preventDefault();
    let userObj = { username: username, password: password };
    props.handleCreateUser(userObj);
  };

  return (
    <div class="newUserFormContainer">
      <h1 class="newUserFormTitle">Create an Account</h1>
      <form onSubmit={triggerCreateUser} class="inputForm">
        <h2>Username</h2>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <h2>Password</h2>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {props.toggleError ? (
          <h5 className="errorMessage">{props.errorMessage}</h5>
        ) : null}

        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
};

export default NewUserForm;
