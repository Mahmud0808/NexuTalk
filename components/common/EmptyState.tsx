import React from "react";

const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full w-full flex justify-center items-center bg-bg-secondary">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-lg lg:text-xl font-semibold text-text">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
