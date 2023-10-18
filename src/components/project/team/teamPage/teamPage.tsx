import { PlusSign, SearchIcon } from "@/assets/icon";
import React from "react";

const TeamPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[716px] bg-t-gray-2 relative  space-x-2 px-5 py-2 rounded-lg flex items-center">
          <SearchIcon />
          <input
            placeholder="Search member"
            className="bg-transparent w-full text-t-black border-none outline-none"
            type="text"
          />
        </div>
        <button className="flex text-white p-4 bg-t-purple items-center space-x-2">
          <PlusSign />
          Add New Member
        </button>
      </div>
    </div>
  );
};

export { TeamPage };
