import { useEffect } from 'react';

const RoomMembers = ({ user, members, setMembers, gameState }) => {
  useEffect(() => {
    user.socket.on('joined', (members) => {
      setMembers(members);
    });
  }, [user.socket, setMembers]);

  return (
    <div className="bg-black text-white min-h-40 pl-2">
      <h4>Room Members:</h4>
      <ul>
        {members.map((member, index) => (
          <li
            key={index}
            className={
              member === gameState.turnOrder[gameState.currentTurnIndex]
                ? 'text-yellow-500'
                : 'text-white'
            }
          >
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomMembers;
