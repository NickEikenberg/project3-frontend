import { useState } from 'react';
import io from 'socket.io-client';

const JoinRoomForm = ({ user, setUser }) => {
  const [roomName, setRoomName] = useState();

  const handleInputChange = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleJoin = () => {
    const newSocket = io('http://thawing-scrubland-60943.herokuapp.com/', {
      query: { roomName, username: user.username },
    });
    setUser({ ...user, room: roomName, socket: newSocket });
  };

  return (
    <>
      <input type="text" onChange={handleInputChange} />
      <button onClick={handleJoin}>Join room</button>
    </>
  );
};

export default JoinRoomForm;
