import React from 'react';

const UserWelcome = ({ user, showUserProfile }) => {
  //   const placeShowUserProfile = () => {
  //     console.log('click');
  //   };
  return (
    <div className="w-screen flex justify-center">
      {user.username ? (
        <div
          className="flex justify-center w-full cursor-pointer bg-red-300 mx-6"
          onClick={showUserProfile}
        >
          <div className=" bg-red-300 w-full mx-6 px-6 py-2 flex justify-between items-center lg:w-1/2">
            <h1 className="text-white text-md">Hi, {user.username}! </h1>

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
