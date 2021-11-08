import { useRef } from 'react';

const MessageInputForm = ({ gameState, user, handleEndGame }) => {
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
      input.current.value = '';
    }
  };

  return gameState.inProgress ? (
    user.username === gameState.turnOrder[gameState.currentTurnIndex] ? (
      <>
        <form onSubmit={handleSubmit} className="relative overflow-hidden flex">
          <textarea
            ref={input}
            className="border border-black rounded w-11/12 h-full resize-none"
          ></textarea>
          <input
            type="submit"
            value=">"
            className="right-0 w-1/12 rounded-lg cursor-pointer py-2 bg-green-400 hover:bg-green-300"
          />
        </form>
        <button
          onClick={handleEndGame}
          className="border border-black rounded px-3 py-1 hover:bg-red-100"
        >
          End Game
        </button>
      </>
    ) : (
      <div>Not your turn</div>
    )
  ) : (
    <form onSubmit={handleSubmit} className="relative overflow-hidden flex">
      <textarea
        ref={input}
        className="border border-black rounded w-11/12 h-full resize-none"
      ></textarea>
      <input
        type="submit"
        value=">"
        className=" right-0 w-1/12 rounded-lg cursor-pointer py-2 bg-green-400 hover:bg-green-300 "
      />
    </form>
  );
};

export default MessageInputForm;
