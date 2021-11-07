import { useEffect } from 'react';

const RoomMembers = ({ user, members, setMembers }) => {
  useEffect(() => {
    user.socket.on('joined', (members) => {
      setMembers(members);
    });
  }, [user.socket]);

  return (
    <div>
      <h4>Room Members:</h4>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomMembers;
