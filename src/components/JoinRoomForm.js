import { useState } from 'react';
import io from 'socket.io-client';

const JoinRoomForm = ({ user, setUser }) => {
  const [roomName, setRoomName] = useState();

  const handleInputChange = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleJoin = () => {
    const newSocket = io('http://thawing-scrubland-60943.herokuapp.com', {
      query: { roomName, username: user.username },
    });
    setUser({ ...user, room: roomName, socket: newSocket });
  };

  return (
    <div className="bg-black h-20 flex justify-center items-center text-white">
      <input
        type="text"
        onChange={handleInputChange}
        className="bg-transparent border-b-2 border-white mx-2"
        placeholder="Enter a room name"
      />
      <button
        onClick={handleJoin}
        className="cursor-pointer bg-white text-black rounded-md px-2"
      >
        Join room
      </button>
    </div>
  );
};

export default JoinRoomForm;
