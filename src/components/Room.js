import { useState, useRef, useEffect } from 'react';
import RoomMembers from './RoomMembers';

// Array randomizer cound at: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const randomize = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const Room = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [gameState, setGameState] = useState({
    turnOrder: [],
    currentTurnIndex: 0,
    inProgress: false
  });
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageObj = {
      avatar: user.avatar,
      sender: user.username,
      text: input.current.value,
    };

    if (input.current.value) {
      user.socket.emit('send-message', messageObj);
      setMessages([...messages, messageObj]);
      input.current.value = '';
    }
  };

  const handleBeginGame = () => {
    const turnOrder = randomize([...members]);
    const gameObj = {
      turnOrder,
      currentTurnIndex: 0,
      inProgress: true
    };
    user.socket.emit('begin-game', gameObj)
  };

  const handleLeave = () => {
    user.socket.close();
    setUser({ ...user, room: '', socket: null });
  };

  useEffect(() => {
    user.socket.on('receive-message', ({ sender, text, avatar }) => {
      setMessages([...messages, { sender, text, avatar }]);
      if (gameState.inProgress) {
        if (gameState.currentTurnIndex === gameState.turnOrder - 1) {
          setGameState({...gameState, currentTurnIndex: 0});
        } else {
          setGameState({
            ...gameState,
            currentTurnIndex: gameState.currentTurnIndex + 1});
        }
      }
    });
  }, [user.socket, messages]);

  useEffect(() => {
    user.socket.on('game-has-begun', (gameObj) => {
      setMessages([]);
      setGameState(gameObj);
    });
  }, []);

  return (
    <div>
      <h2>In Room: {user.room}</h2>
      {gameState.inProgress ?
        <h3>Game is in progress.</h3> :
        <div>
          <h3>When everyone is present, you can begin game:</h3>
          <button onClick={handleBeginGame} className="border border-black rounded px-3 py-1 hover:bg-red-100">Begin Game</button>
        </div>
      }

      <div id="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="flex">
            <img
              src={msg.avatar}
              alt={`${msg.sender}'s avatar'`}
              className="h-12 w-12 rounded-full"
            />
            {`${msg.sender}: ${msg.text}`}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea ref={input}></textarea>
        <input type="submit" value="Submit Message" />
      </form>
      <button onClick={handleLeave} className="border border-black rounded px-3 py-1 hover:bg-red-100">Leave Room</button>
      <RoomMembers user={user} members={members} setMembers={setMembers} gameState={gameState} />
    </div>
  );
};

export default Room;
