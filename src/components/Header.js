import React from 'react';

const Header = ({ showUserProfile, user }) => {
  return (
    <header className="w-full flex justify-between items-center bg-white py-4 px-4 shadow-sm rounded-md">
      <h1 className="text-3xl text-center w-1/3">Exquisite Corpse</h1>
      <button className="justify-self-end flex justify-end">
        <span className="cursor-pointer">
          {user.username ? (
            <ion-icon
              name="person-circle-outline"
              onClick={showUserProfile}
            ></ion-icon>
          ) : (
            <ion-icon name="person-circle-outline"></ion-icon>
          )}
        </span>
      </button>
    </header>
  );
};

export default Header;
