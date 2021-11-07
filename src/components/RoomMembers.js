const RoomMembers = ({ members }) => {
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
