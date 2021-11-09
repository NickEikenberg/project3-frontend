import { useCallback } from 'react';

const MessagesContainer = ({ gameState, messages, user }) => {
  // function to scroll chat to most recent borrowed from socket.io/react tutorial found here: https://youtu.be/tBr-PybP_9c
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, []);

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
                  className="h-10 w-10 rounded-full"
                />
                <p className="mr-2 pr-1">{messages[messages.length - 1].sender}:</p>
                <p className="break-words">{messages[messages.length - 1].text}</p>
              </div>
            )}
        </div>
      ) : (
        <div>
          {messages.map((msg, index) => {
            const lastMessage = messages.length - 1 === index;
            return (
              <div
                key={index}
                className="flex"
                ref={lastMessage ? setRef : null}
              >
                <img
                  src={msg.avatar}
                  alt={`${msg.sender}'s avatar'`}
                  className="h-10 w-10 rounded-full my-1"
                />
                <p className="mr-2 pr-1">{msg.sender}: </p>
                <p className="break-words">{msg.text}</p>
              </div>
            )}
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
