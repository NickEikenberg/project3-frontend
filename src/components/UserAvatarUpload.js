import React, { useState } from 'react';
import axios from 'axios';

const UserAvatarUpload = ({ user }) => {
  const [avatar, setAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      'avatar',
      selectedFile
      //   this.state.selectedFile.name
    );
    axios.post(`http://localhost:3001/users/${user}`, formData).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <h1>Hi {user.username}! Please upload an avatar:</h1>

      <form onSubmit={fileUploadHandler}>
        <input type="text" className="border-b-2 border-black" />
        <input type="submit" value="Submit" className="cursor-pointer"></input>
      </form>
    </div>
  );
};

export default UserAvatarUpload;
