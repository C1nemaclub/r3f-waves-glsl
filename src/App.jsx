import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { Color, DoubleSide } from 'three';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

const CustomMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color('dodgerblue'),
    uFrecuency: 1,
    uAmplitude: 1,
    uColorStart: new Color('dodgerblue'),
    uColorEnd: new Color('red'),
  },
  vertexShader,
  fragmentShader
);

extend({ CustomMaterial });

function App() {
  const shaderRef = useRef();
  const { frecuency, amplitude, colorStart, colorEnd, wireframe } = useControls(
    {
      frecuency: { value: 1, min: 0, max: 10 },
      amplitude: { value: 1, min: 0, max: 10 },
      colorStart: { value: 'dodgerblue' },
      colorEnd: { value: '#ff0000' },
      wireframe: { value: false },
    }
  );
  useFrame((state, clock) => {
    shaderRef.current.material.uniforms.uTime.value =
      state.clock.getElapsedTime();
  });

  useEffect(() => {
    shaderRef.current.material.uniforms.uFrecuency.value = frecuency;
    shaderRef.current.material.uniforms.uAmplitude.value = amplitude;
    shaderRef.current.material.uniforms.uColorStart.value = new Color(
      colorStart
    );
    shaderRef.current.material.uniforms.uColorEnd.value = new Color(colorEnd);
  }, [frecuency, amplitude, colorStart, colorEnd]);
  return (
    <>
      <mesh ref={shaderRef} rotation-x={Math.PI / 2}>
        <planeGeometry args={[8, 8, 64, 64]} />
        <customMaterial side={DoubleSide} wireframe={wireframe} />
      </mesh>

      <ambientLight intensity={0.6} />
      <OrbitControls makeDefault />
      <color args={['lightgray']} attach='background' />
    </>
  );
}

export default App;
