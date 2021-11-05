import { useState } from 'react';
import io from 'socket.io-client';

const JoinRoomForm = ({ user, setUser }) => {
  const [roomName, setRoomName] = useState();

  const handleInputChange = e => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleJoin = () => {
    const newSocket = io(
      'http://localhost:3001',
      { query: { roomName } }
    );
    setUser({ ...user, room: roomName, socket: newSocket });
  };

  return (
    <>
      <input type='text' onChange={handleInputChange}/>
      <button onClick={handleJoin}>Join room</button>
    </>
  );
};

export default JoinRoomForm;
