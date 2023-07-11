/*
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, cube;

    // Erstellen der Szene, Kamera und Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Erstellen des Würfels
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Positionieren der Kamera
    camera.position.z = 5;

    // Animations-Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Drehen des Würfels
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Aufräumen beim Komponenten-Unmount
    return () => {
      scene.remove(cube);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Cube;
*/

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ModelViewer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/models/house.gltf', (gltf) => {
        scene.add(gltf.scene);

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
      });

      const light = new THREE.AmbientLight(0xffffff);
      scene.add(light);

      renderer.render(scene, camera);
    };

    init();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ModelViewer;
