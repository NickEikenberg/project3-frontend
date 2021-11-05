import React, { useState } from 'react';

const NewUserForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const triggerCreateUser = (event) => {
    event.preventDefault();
    let userObj = { username: username, password: password, avatar: avatar };
    props.handleCreateUser(userObj);
  };

  return (
    <div class="newUserFormContainer">
      <h1 className="text-center text-xl">Create an Account</h1>
      <form onSubmit={triggerCreateUser} class="inputForm flex flex-col">
        <h2>Username</h2>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="border-b-2 border-black"
        />
        <h2>Password</h2>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="border-b-2 border-black"
        />
        {props.toggleError ? (
          <h5 className="errorMessage">{props.errorMessage}</h5>
        ) : null}

        <h2>Upload an Avatar</h2>
        <input
          type="text"
          placeholder="png or jpeg"
          onChange={(event) => {
            setAvatar(event.target.value);
          }}
          className="border-b-2 border-black"
        />

        <input
          type="submit"
          value="Create Account"
          className="my-4 cursor-pointer bg-blue-400 text-white rounded-xl hover:bg-blue-500 focus:bg-blue-600"
        />
      </form>
    </div>
  );
};

export default NewUserForm;
