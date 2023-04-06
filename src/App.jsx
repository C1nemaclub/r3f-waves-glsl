import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { Color, DoubleSide } from 'three';
import { useControls } from 'leva';
import { useRef } from 'react';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

const CustomMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color('dodgerblue'),
  },
  vertexShader,
  fragmentShader
);

extend({ CustomMaterial });

function App() {
  const shaderRef = useRef();
  useControls({
    speed: { value: 0, min: 0, max: 10 },
  });
  useFrame((state, clock) => {
    shaderRef.current.material.uniforms.uTime.value =
      state.clock.getElapsedTime();
  });
  return (
    <>
      <mesh ref={shaderRef} rotation-x={Math.PI / 2}>
        <planeGeometry args={[8, 8, 64, 64]} />
        <customMaterial side={DoubleSide} />
      </mesh>

      <ambientLight intensity={0.6} />
      <OrbitControls makeDefault />
      <color args={['lightgray']} attach='background' />
    </>
  );
}

export default App;
