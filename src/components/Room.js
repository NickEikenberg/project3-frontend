import { useState, useRef, useEffect } from 'react';
import RoomMembers from './RoomMembers';

const Room = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.current.value) {
      user.socket.emit('send-message', {
        sender: user.username,
        text: input.current.value,
      });
      setMessages([...messages, `${user.username}: ${input.current.value}`]);
      input.current.value = '';
    }
  };

  const handleLeave = () => {
    user.socket.close();
    setUser({ ...user, room: '', socket: null });
  };

  useEffect(() => {
    user.socket.on('receive-message', ({ sender, text }) => {
      setMessages([...messages, `${sender}: ${text}`]);
    });
  }, [user.socket, messages]);

  useEffect(() => {
    user.socket.on('joined', (members) => {
      console.log(members);
      setMembers(members);
    });
  }, [user.socket]);

  return (
    <div>
      <h2>In Room: {user.room}</h2>
      <div id="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="flex">
            <img
              src={user.avatar}
              alt={`${user.username}'s avatar'`}
              className="h-12 w-12 rounded-full"
            />
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea ref={input}></textarea>
        <input type="submit" value="Submit Message" />
      </form>
      <button onClick={handleLeave}>Leave Room</button>
      <RoomMembers members={members}/>
    </div>
  );
};

export default Room;
