import React from 'react';
import { useDataContext } from './context';

const Comments: React.FC = () => {
  const { name, age, city } = useDataContext(); 

  return (
    <div>
      <h2>Comments</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>City:</strong> {city}</p>
    </div>
  );
};

export default Comments;
