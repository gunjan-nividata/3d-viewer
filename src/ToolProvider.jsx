import { createContext, useState } from 'react';

export const ToolContext = createContext({
  position: 'reset',
  setPosition: () => {},
});

export const ToolProvider = ({ children }) => {
  const [position, setPosition] = useState('reset');

  return (
    <ToolContext.Provider value={{ position }}>
      <div className='controls-container'>
        <button onClick={() => setPosition('reset')}>Reset</button>
        <button onClick={() => setPosition('top')}>Top</button>
        <button onClick={() => setPosition('left')}>Left</button>
        <button onClick={() => setPosition('right')}>Right</button>
        <button onClick={() => setPosition('bottom')}>Bottom</button>
        <button onClick={() => setPosition('front')}>Front</button>
        <button onClick={() => setPosition('back')}>Back</button>
      </div>
      {children}
    </ToolContext.Provider>
  );
};
