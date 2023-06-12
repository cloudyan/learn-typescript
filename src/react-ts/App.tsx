import React from 'react';
import Person from './component';

const App: React.FC = () => {
  return (
    <div>
      <Person name='ConardLi' age={17} />
    </div>
  );
};

export default App;
