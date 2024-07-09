import { Canvas } from '@react-three/fiber';
import './App.css';
import { ToolProvider } from './ToolProvider';
import Viewer from './Viewer';

function App() {
  return (
    <ToolProvider>
      <div id='canvas-container'>
        <Canvas camera={{ position: [0, 50, 50] }}>
          <Viewer />
        </Canvas>
      </div>
    </ToolProvider>
  );
}

export default App;
