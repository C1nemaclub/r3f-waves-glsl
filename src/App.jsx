import {
  Environment,
  OrbitControls,
  TransformControls,
  shaderMaterial,
  useTexture,
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { Color, DoubleSide, Vector3 } from 'three';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

const CustomMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color('dodgerblue'),
    uFrecuency: 0.5,
    uAmplitude: 0.3,
    uColorStart: new Color('dodgerblue'),
    uColorEnd: new Color('red'),
    uNormalTexture: null,
  },
  vertexShader,
  fragmentShader
);

extend({ CustomMaterial });

function App() {
  const normal_texture = useTexture('normal_ocean.jpg');
  const shaderRef = useRef();
  const { frecuency, amplitude, colorStart, colorEnd, wireframe } = useControls(
    {
      frecuency: { value: 0.5, min: 0, max: 10 },
      amplitude: { value: 0.3, min: 0, max: 10 },
      colorStart: { value: '#241f1f' },
      colorEnd: { value: '#3172b1' },
      wireframe: { value: false },
    }
  );
  useFrame((state, clock) => {
    shaderRef.current.material.uniforms.uTime.value =
      state.clock.getElapsedTime();
  });

  useEffect(() => {
    shaderRef.current.material.uniforms.uNormalTexture.value = normal_texture;
  }, []);

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
        <planeGeometry args={[16, 16, 64, 64]} />
        <customMaterial side={DoubleSide} wireframe={wireframe} />
      </mesh>

      <ambientLight intensity={0.6} />
      <OrbitControls makeDefault />
    </>
  );
}

export default App;
