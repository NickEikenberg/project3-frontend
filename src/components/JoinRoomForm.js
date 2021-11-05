import { useState } from 'react';

const JoinRoomForm = ({ user, setUser }) => {
  const [roomName, setRoomName] = useState();

  const handleInputChange = e => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleJoin = () => {
    setUser({...user, room: roomName});
  };

  return (
    <>
      <input type='text' onChange={handleInputChange}/>
      <button onClick={handleJoin}>Join room</button>
    </>
  );
};

export default JoinRoomForm;
