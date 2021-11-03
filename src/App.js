import {useState, useEffect} from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import NewUserForm from './NewUserForm';

const App = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleLogout, setToggleLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleCreateUser = (userObj) => {
    axios.post('http://localhost:3001/users/new', userObj)
    .then((res) => {
      if (res.data.username) {
        console.log(res);
        setToggleError(false);
        setErrorMessage('');
        setCurrentUser(res.data);
        handleToggleLogout();
      } else {
        setErrorMessage(res.data);
        setToggleError(true);
      }
    });
  };

  return (
    <div>
      <h1>Exquisite Corpse</h1>
      <NewUserForm handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
    </div>
  );
};

export default App;
