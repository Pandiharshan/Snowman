import React from 'react';
import './About.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
const SnowmanModel = () => {
  const { scene } = useGLTF('/models/snow_man.glb');
  return <primitive object={scene} />;
};
const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Snowman</h2>
            <p className="about-paragraph">
              Snowman empowers teams with futuristic digital tools that transform the way 
              businesses connect with their audiences. We believe in creating experiences 
              that are not just functional, but truly memorable.
            </p>
            <p className="about-paragraph">
              Our mission is to bridge the gap between imagination and reality, delivering 
              cutting-edge solutions that push the boundaries of what's possible in the 
              digital landscape.
            </p>
            <p className="about-paragraph">
              From innovative web applications to immersive user interfaces, we craft 
              every pixel with purpose and every interaction with intention.
            </p>
          </div>
          
          <div className="about-image">
            <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
              {/* Hemisphere light for natural ambient tone */}
              <hemisphereLight skyColor="#ffffff" groundColor="#333333" intensity={1.2} />

              {/* Strong ambient light to reduce harsh shadows */}
              <ambientLight intensity={1.5} />

              {/* Main directional light with strong intensity */}
              <directionalLight 
              position={[5, 5, 5]} 
              intensity={2.0} 
              castShadow 
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              />

              {/* Fill directional light to soften other sides */}
              <directionalLight 
              position={[-5, 5, 5]} 
              intensity={1.2} 
              color="#ffffff"
              />

              {/* Point light for local highlights */}
              <pointLight 
              position={[0, 0, 5]} 
              intensity={1.0} 
              color="#a78bfa" 
              />

              { /* Snowman Model */}
              <SnowmanModel scale={0.4} />

              {/* Controls */}
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;