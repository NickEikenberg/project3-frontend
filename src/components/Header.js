import { useState } from 'react';

const Header = () => {
  const [toggleSpin, setToggleSpin] = useState(false);

  const handleToggleSpin = () => {
    setToggleSpin(!toggleSpin);
  };

  return (
    <header className="w-full flex justify-between items-center bg-white py-4 px-4 shadow-sm rounded-md">
      <h1 className="text-3xl text-center">Tinier Bananas</h1>
      {toggleSpin ?
        <div onClick={handleToggleSpin}>
          <img
            className="justify-self-end flex justify-end h-14 border border-black border-opacity-75 rounded-lg animate-spin"
            src="../tiny-bananas.jpeg"
            alt="tiny bananas"
          />
        </div> :
        <div onClick={handleToggleSpin}>
          <img
            className="justify-self-end flex justify-end h-14 border border-black border-opacity-75 rounded-lg"
            src="../tiny-bananas.jpeg"
            alt="tiny bananas"
            onClick={handleToggleSpin}
          />
        </div>
      }
    </header>
  );
};

export default Header;
