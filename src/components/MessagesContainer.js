const MessagesContainer = ({ gameState, messages, user }) => {
  return (
    gameState.inProgress ?
      <div>
        { messages[0] && user.username === gameState.turnOrder[gameState.currentTurnIndex] &&
          <div className="flex">
            <img
              src={messages[messages.length - 1].avatar}
              alt={`${messages[messages.length - 1].sender}'s avatar'`}
              className="h-12 w-12 rounded-full"
            />
            <p>{messages[messages.length - 1].sender}: </p>
            <p>{messages[messages.length - 1].text}</p>
          </div>
        }
      </div> :
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="flex">
            <img
              src={msg.avatar}
              alt={`${msg.sender}'s avatar'`}
              className="h-12 w-12 rounded-full"
            />
            <p>{msg.sender}: </p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
  );
};

export default MessagesContainer;
