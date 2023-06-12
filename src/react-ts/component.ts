
// src/components/Person.tsx
import React from 'react';

const Person: React.FC<{
  name: string;
  age: number;
}> = ({ name, age }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};

export default Person;


// 一般我们更喜欢用 interface 定义 props：
interface Props {
  name: string;
  age: number;
}

const Person2: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};
