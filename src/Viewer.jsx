import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ToolContext } from './ToolProvider';
// extend({ OrbitControls })
// import sampleUrl from './assets/Sample.glb'

const Model = ({ url }) => {
  const group = useRef();
  const model = useRef();
  const { scene } = useThree();

  useEffect(() => {
    // Clean up previous model
    if (model.current) {
      scene.remove(model.current);
    }

    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      const newModel = gltf.scene.clone();
      newModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Center the model within the group
      const box = new THREE.Box3().setFromObject(newModel);
      const center = box.getCenter(new THREE.Vector3());
      newModel.position.sub(center);

      scene.add(newModel);
      model.current = newModel;
    });

    return () => {
      // Clean up the model when unmounting
      if (model.current) {
        scene.remove(model.current);
      }
    };
  }, [url, scene]);

  return null;
};

const Viewer = () => {
  const { position } = useContext(ToolContext);
  const { camera } = useThree();

  const resetPosition = {
    x: 0,
    y: 50,
    z: 50
  }
  // camera.position.set(0, 50, 50);

  function animateCamera(position, lookAt) {
    const tl = gsap.timeline();
    const { x, y, z } = camera.position
    if (x !== resetPosition.x || y !== resetPosition.y || parseInt(z) !== resetPosition.z) {
      tl.to(camera.position, {
        ...resetPosition,
        duration: 0.5,
        ease: 'sine.in'
      });
    }
    camera.up.set(0, 1, 0);
    tl.to(camera.position, {
      duration: 0.5,
      x: position.x,
      y: position.y,
      z: position.z,
      ease: 'sine.out',
      onUpdate: () => camera.lookAt(lookAt.x, lookAt.y, lookAt.z),
    });
  }

  useEffect(() => {
    if (position === 'top') {
      animateCamera({ x: 0, y: 50, z: 0 }, { x: 0, y: 0, z: 0 });
    } else if (position === 'left') {
      animateCamera({ x: -50, y: 0, z: 0 }, { x: 0, y: 0, z: 0 });
      camera.up.set(0, 1, 0);
    } else if (position === 'right') {
      animateCamera({ x: 50, y: 0, z: 0 }, { x: 0, y: 0, z: 0 });
      camera.up.set(0, 1, 0);
    } else if (position === 'bottom') {
      animateCamera({ x: 0, y: -50, z: 0 }, { x: 0, y: 0, z: 0 });
    } else if (position === 'front') {
      animateCamera({ x: 0, y: 0, z: 50 }, { x: 0, y: 0, z: 0 });
    } else if (position === 'back') {
      animateCamera({ x: 0, y: 0, z: -50 }, { x: 0, y: 0, z: 0 });
    } else {
      animateCamera({ x: 0, y: 50, z: 50 }, { x: 0, y: 0, z: 0 });
      camera.up.set(0, 1, 0);
    }
  }, [position]);

  return (
    <>
      <OrbitControls />
      {/* <ambientLight intensity={0.1} />
      <axesHelper args={[5]} /> */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 50, 10]} />
      <directionalLight position={[2, 1, 3]} />
      {/* <directionalLight position={[0, 5, 0]} color='blue' />
      <directionalLight position={[-5, 0, 0]} color='yellow' />
      <directionalLight position={[5, 0, 0]} color='green' />
      <directionalLight position={[0, 0, 5]} color='red' />
      <directionalLight position={[0, -5, 0]} color='cyan' /> */}
      <Model url='https://3d-objects-bim.s3.ap-south-1.amazonaws.com/FB_B_LSB_Dicke+Rippe.glb' />
      {/* <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
};

export default Viewer;
