import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Canvas } from '@react-three/fiber';
import './index.css';
import { Leva } from 'leva';
import { Fog } from 'three';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas camera={{ position: [0, 4, 4], fov: 70 }}>
      <color args={['#363636']} attach='background' />
      <App />
    </Canvas>
    <Leva />
  </React.StrictMode>
);
