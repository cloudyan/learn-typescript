import React from 'react';
import Person from './component';

// 需要 @types/react

const App: React.FC = () => {
  return (
    <div>
      <Person name='ConardLi' age={17} />
    </div>
  );
};

export default App;
