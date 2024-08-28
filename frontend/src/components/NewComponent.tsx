import React from 'react';

interface NewComponentProps {
  // Define your props here
  message: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ message }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h1 className="text-xl font-bold mb-2">New Component</h1>
      <p>{message}</p>
    </div>
  );
};

export default NewComponent;