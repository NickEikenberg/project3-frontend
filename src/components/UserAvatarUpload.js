import React, { useState } from 'react';
import axios from 'axios';

const UserAvatarUpload = ({ user }) => {
  const [avatar, setAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      'avatar',
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios.post(`http://localhost:3001/users/${user}`, formData).then((res) => {
      console.log(res);
    });
    // Will probably need to create a new component for uploading an avatar, so we can use the current user path
  };
  return (
    <div>
      <h1>Hi {user.username}! Please upload an avatar:</h1>

      <form onSubmit={fileUploadHandler}>
        <input
          type="file"
          onChange={(event) => {
            fileSelectedHandler(event);
            setAvatar(event.target.files[0]);
          }}
          className="border-b-2 border-black"
        />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default UserAvatarUpload;
