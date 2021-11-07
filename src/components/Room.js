import { useState, useEffect } from 'react';
import RoomMembers from './RoomMembers';
import MessagesContainer from './MessagesContainer';
import MessageInputForm from './MessageInputForm';

// Array randomizer found at: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

  const handleBeginGame = () => {
    const turnOrder = randomize([...members]);
    user.socket.emit('begin-game', turnOrder)
  };

  const handleEndGame = () => {
    user.socket.emit('end-game');
  };

  const handleLeave = () => {
    user.socket.close();
    setUser({ ...user, room: '', socket: null });
  };

  const incrementTurnOrder = () => {
    setGameState(prevGameState => {
      if (!prevGameState.inProgress) return prevGameState;
      if (prevGameState.currentTurnIndex === prevGameState.turnOrder.length - 1) {
        return {
          ...prevGameState,
          currentTurnIndex: 0
        }
      } else {
        return {
          ...prevGameState,
          currentTurnIndex: prevGameState.currentTurnIndex + 1
        }
      }
    });
  };

  useEffect(() => {
    user.socket.on('receive-message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
      incrementTurnOrder();
    });
  }, [user.socket]);

  useEffect(() => {
    user.socket.on('game-has-begun', turnOrder => {
      setMessages([]);
      setGameState(prevGameState => {
        return {
          turnOrder: turnOrder,
          currentTurnIndex: 0,
          inProgress: true
        }
      });
    });
  }, [user.socket]);

  useEffect(() => {
    user.socket.on('game-has-ended', () => {
      setGameState(prevGameState => {
        return {
          turnOrder: [],
          currentTurnIndex: 0,
          inProgress: false
        }
      });
    });
  }, [user.socket]);

  return (
    <div>
      <h2>In Room: {user.room}</h2>
      {gameState.inProgress ?
        <div>
          <h3>Game is in progress.</h3>
          <h4>
          {user.username === gameState.turnOrder[gameState.currentTurnIndex] ?
            'It is your turn' :
            `${gameState.turnOrder[gameState.currentTurnIndex]}'s turn`
          }
          </h4>
        </div> :
        <div>
          <h3>When everyone is present, you can begin game:</h3>
          <button onClick={handleBeginGame} className="border border-black rounded px-3 py-1 hover:bg-red-100">Begin Game</button>
        </div>
      }
      <MessagesContainer
        gameState={gameState}
        messages={messages}
        user={user}
      />
      <MessageInputForm
        gameState={gameState}
        user={user}
        handleEndGame={handleEndGame}
      />
      {!gameState.inProgress &&
        <button
          onClick={handleLeave}
          className="border border-black rounded px-3 py-1 hover:bg-red-100"
        >Leave Room</button>
      }
      <RoomMembers
        user={user}
        members={members}
        setMembers={setMembers}
        gameState={gameState}
      />
    </div>
  );
};

export default Room;
