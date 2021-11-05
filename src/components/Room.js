import {useState, useRef} from 'react';

const Room = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const input = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    setMessages([...messages, `${user.username}: ${input.current.value}`]);
    input.current.value = '';
  };

  const handleLeave = () => {
    setUser({...user, room: ''});
  };

  return (
    <div>
      <h2>In Room: {user.room}</h2>
      <div id="message-container">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea ref={input}></textarea>
        <input type="submit" value="Submit Message" />
      </form>
      <button onClick={handleLeave}>Leave Room</button>
    </div>
  );
};

export default Room;
