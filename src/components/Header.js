import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white py-4 px-4 shadow-sm">
      <h1 className="text-3xl text-center w-1/3">Exquisite Corpse</h1>
      <button className="justify-self-end flex justify-end">
        <span className="cursor-pointer">
          <ion-icon name="person-circle-outline"></ion-icon>
        </span>
      </button>
    </header>
  );
};

export default Header;
