import { useRef } from 'react';

const MessageInputForm = ({ gameState, user }) => {
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageObj = {
      avatar: user.avatar,
      sender: user.username,
      text: input.current.value
    };

    if (input.current.value) {
      user.socket.emit('send-message', messageObj);
      input.current.value = '';
    }
  };

  return (
    gameState.inProgress ?
      user.username === gameState.turnOrder[gameState.currentTurnIndex] ?
        <form onSubmit={handleSubmit}>
          <textarea ref={input} className="border border-black rounded"></textarea>
          <input type="submit" value="Submit Message" />
        </form> :
        <div>Not your turn</div>
      :
      <form onSubmit={handleSubmit}>
        <textarea ref={input} className="border border-black rounded"></textarea>
        <input type="submit" value="Submit Message" />
      </form>
  );
};

export default MessageInputForm;
