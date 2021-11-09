import { useState, useEffect } from 'react';
import RoomMembers from './RoomMembers';
import MessagesContainer from './MessagesContainer';
import MessageInputForm from './MessageInputForm';

// Array randomizer found at: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const randomize = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const Room = ({ user, setUser, handleLeave, }) => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [gameState, setGameState] = useState({
    turnOrder: [],
    currentTurnIndex: 0,
    inProgress: false,
  });

  const handleBeginGame = () => {
    const turnOrder = randomize([...members]);
    user.socket.emit('begin-game', turnOrder);
  };

  const handleEndGame = () => {
    user.socket.emit('end-game');
  };

  useEffect(() => {
    const incrementTurnOrder = () => {
      setGameState((prevGameState) => {
        if (!prevGameState.inProgress) return prevGameState;
        if (
          prevGameState.currentTurnIndex ===
          prevGameState.turnOrder.length - 1
        ) {
          return {
            ...prevGameState,
            currentTurnIndex: 0,
          };
        } else {
          return {
            ...prevGameState,
            currentTurnIndex: prevGameState.currentTurnIndex + 1,
          };
        }
      });
    };

    user.socket.on('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      incrementTurnOrder();
    });

    user.socket.on('game-has-begun', (turnOrder) => {
      setMessages([]);
      setGameState((prevGameState) => {
        return {
          turnOrder: turnOrder,
          currentTurnIndex: 0,
          inProgress: true,
        };
      });
    });

    user.socket.on('game-has-ended', () => {
      setGameState((prevGameState) => {
        return {
          turnOrder: [],
          currentTurnIndex: 0,
          inProgress: false,
        };
      });
    });
  }, [user.socket, setGameState]);

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center text-white font bg-black text-2xl">
        In Room: {user.room}
      </h2>
      {gameState.inProgress ? (
        <div className="flex flex-col justify-center items-center bg-black">
          <h3 className="text-center text-white">Game is in progress.</h3>
          <h4 className="text-center text-white">
            {user.username === gameState.turnOrder[gameState.currentTurnIndex]
              ? 'It is your turn'
              : `${gameState.turnOrder[gameState.currentTurnIndex]}'s turn`}
          </h4>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-black">
          <h3 className="text-center text-white">
            When everyone is present, you can begin the game:
          </h3>
          <button
            onClick={handleBeginGame}
            className="bg-white border mx-2 border-black rounded px-3 py-1 hover:bg-black hover:text-white hover:border-white "
          >
            START
          </button>
        </div>
      )}
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
      {!gameState.inProgress && (
        <button
          onClick={handleLeave}
          className="border border-black rounded px-3 py-1 hover:bg-red-100"
        >
          Leave Room
        </button>
      )}
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
