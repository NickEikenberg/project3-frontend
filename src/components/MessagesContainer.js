const MessagesContainer = ({ gameState, messages, user }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100 h-60 overflow-scroll">
      {gameState.inProgress ? (
        <div>
          {messages[0] &&
            user.username ===
              gameState.turnOrder[gameState.currentTurnIndex] && (
              <div className="flex">
                <img
                  src={messages[messages.length - 1].avatar}
                  alt={`${messages[messages.length - 1].sender}'s avatar'`}
                  className="h-12 w-12 rounded-full"
                />
                <p>{messages[messages.length - 1].sender}: </p>
                <p>{messages[messages.length - 1].text}</p>
              </div>
            )}
        </div>
      ) : (
        <div className="">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-center">
              <img
                src={msg.avatar}
                alt={`${msg.sender}'s avatar'`}
                className="h-8 w-8 rounded-full my-1"
              />
              <p>{msg.sender}: </p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
