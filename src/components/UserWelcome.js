import React from 'react';

const UserWelcome = ({ user }) => {
  return (
    <div>
      {user.username ? (
        <div className="flex justify-between w-screen">
          <div className="bg-red-300 w-full mx-6 px-6 flex justify-between items-center lg:w-1/2">
            <h1 className="text-white text-2xl">Hi, {user.username}! </h1>

            <span>
              <div className="ml-3 relative">
                <div className="bg-white rounded-full border border-black">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={user.avatar}
                    alt={`${user.username}'s avatar'`}
                  ></img>
                </div>
              </div>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserWelcome;
