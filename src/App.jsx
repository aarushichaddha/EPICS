import React from 'react';
import { useTrafficLogic } from './useTrafficLogic';
import Overlay from './Overlay';
import World from './World';

function App() {
  const logic = useTrafficLogic();

  return (
    <>
      <World logic={logic} />
      <Overlay logic={logic} />
    </>
  );
}

export default App;
