import { useState } from 'react';

const Rules = () => {
  const [toggleRules, setToggleRules] = useState(false);

  const handleToggleRules = () => {
    setToggleRules(!toggleRules);
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <button
          onClick={handleToggleRules}
          className=" m-2 border border-black rounded px-3 py-1 hover:bg-red-100"
        >
          {toggleRules ?
            'Hide Rules' :
            'Show Rules'
          }
        </button>
      </div>
      {toggleRules &&
        <div className="mt-3 px-2">
          <p className="text-xl">Tell a story with your friends, sentence by sentence!</p>
          <p className="mt-1 underline">How it works:</p>
          <ol>
            <li>1. Join the same room with a group of friends. <span className="text-xs italic">We recommend 4+ participants. The more the merrier. Using an external voice chat can improve the experience.</span></li>
            <li>2. Once everyone is in the same room, click Start. <span className="text-xs italic">During the game, you can only type when it is you turn. Write the next sentence of the story, but you can only see the previous sentence!</span></li>
            <li>3. When you think the story has reached a conclusion, click End Game. <span className="text-xs italic">The entire story will be revealed to all participants, and you can laugh at the absurdity together.</span></li>
          </ol>
        </div>
      }
    </>
  );
};

export default Rules;
