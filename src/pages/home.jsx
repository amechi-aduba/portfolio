import React, { Suspense } from 'react'
import { useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useSpring, a } from '@react-spring/three'
import { Environment } from '@react-three/drei';
import Loader from '../components/loader';
import { useSpringRef }   from '@react-spring/core'
import * as THREE from 'three';
import Projects from './projects';

import Mac from '../models/mac';
import macDraco from '../assets/3d/mac-draco.glb';

function ZoomCamera({ progress }) {

    const { camera } = useThree();
    const springRef = useSpringRef();
    const initialQuaternion = useRef(new THREE.Quaternion());
    const targetQuaternion = useRef(new THREE.Quaternion());
    const tempQuaternion = useRef(new THREE.Quaternion());

    /*camera positions*/ 
    const CAM_START = [0, 5, 30];
    const CAM_END = [0, -2.575, -13];

    const LOOK_START = [0, 0, 0];
    const LOOK_END = [0, 0, -145];

    const { position } = useSpring({
        ref: springRef,
        position: [
            CAM_START[0] + (CAM_END[0] - CAM_START[0]) * progress * 1.3,
            CAM_START[1] + (CAM_END[1] - CAM_START[1]) * progress * 1.3,
            CAM_START[2] + (CAM_END[2] - CAM_START[2]) * progress * 1.3,
        ],
        config: {
            tension: 120,
            friction: 25,
        }
    });

    useEffect(() => {
        // initialize quaternions once
        const startDirection = new THREE.Vector3();
        startDirection.subVectors(
            new THREE.Vector3(LOOK_START[0], LOOK_START[1], LOOK_START[2]),
            new THREE.Vector3(CAM_START[0], CAM_START[1], CAM_START[2])
        ).normalize();

        const endDirection = new THREE.Vector3();
        endDirection.subVectors(
            new THREE.Vector3(LOOK_END[0], LOOK_END[1], LOOK_END[2]),
            new THREE.Vector3(CAM_END[0], CAM_END[1], CAM_END[2]) 
        ).normalize();

        // create temporary camera to get quaternions
        const tempCamera = new THREE.PerspectiveCamera();

        // get initial quaternion
        tempCamera.position.set(CAM_START[0], CAM_START[1], CAM_START[2]);
        tempCamera.lookAt(LOOK_START[0], LOOK_START[1], LOOK_START[2]);
        initialQuaternion.current.copy(tempCamera.quaternion);

        // get end quaternion
        tempCamera.position.set(CAM_END[0], CAM_END[1], CAM_END[2]);
        tempCamera.lookAt(LOOK_END[0], LOOK_END[1], LOOK_END[2]);
        targetQuaternion.current.copy(tempCamera.quaternion);

    }, []);

    useFrame(() => {
        if (camera) {
            camera.position.set(position.get()[0], position.get()[1], position.get()[2]);
            
            tempQuaternion.current.copy(initialQuaternion.current).slerp(targetQuaternion.current, progress);

            // apply quaternion
            camera.quaternion.copy(tempQuaternion.current);

            //update camera
            camera.updateProjectionMatrix();
        }
    });

    useEffect(() => {
        if (camera) {
            camera.position.set(CAM_START[0], CAM_START[1], CAM_START[2]);
            camera.lookAt(LOOK_START[0], LOOK_START[1], LOOK_START[2]);
            camera.updateProjectionMatrix();
        }
    }, []);

    useEffect(() => {
        springRef.start();
    }, [progress, springRef]);

    return null;
}

const Home = () =>{
    const [progress, setProgress] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() =>{
        const onScroll = () =>{
            if (!containerRef.current) return;

            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;

            //const rect = heroRef.current.getBoundingClientRect();
            const pct = Math.min(scrollPosition / viewportHeight, 1);
            //const pct = Math.min(Math.abs(rect.top) / window.innerHeight, 1);
            setProgress(pct);


            if (pct >= 0.70 && !isTransitioning){
                setIsTransitioning(true);
            } else if (pct < .70 && isTransitioning){
                setIsTransitioning(false);
            }


            if (pct >= .95 && !isZoomed){
                setIsZoomed(true);
            } else if (pct < .95 && isZoomed){
                setIsZoomed(false);
            }
        };
        
        onScroll();

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isTransitioning, isZoomed]);

    const macScale = [1, 1, 1];
    const macPosition = [0, -5, 10]; //where the mac position is being changed
    const macRotation = [0, 9.42, 0];

  
    return (
    <div ref={containerRef} className='relative'>
        {/* <div style={{height: '200vh'}}/> */}
        <div ref={overlayRef} 
            // className={
            // progress < 1 ? "sticky top-0 h-screen bg-[#eef0f2]" 
            // : "relative h-0 overflow-hidden pointer-events-none"}
            className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-primary z-15 "
            style={{
                opacity: isZoomed ? 0 : 1,
                transition: 'opacity .5s ease-in-out',
                pointerEvents: isZoomed ? 'none' : 'auto',
            }}
            >
        <Canvas
            className='w-full h-full'
            //camera={{ position: [0, 6.5, -47], fov: 35}}
        >
            <ZoomCamera progress={progress}/> 
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Environment preset="city" />

            <Suspense fallback={<Loader />}>
               
                    <group rotation={[0, Math.PI, 0]}>
                        <Mac 
                            progress={progress} 
                            scale={macScale} 
                            position={macPosition} 
                            rotation={macRotation}
                            modelPath={macDraco}
                        />
                    </group>
            </Suspense>
        </Canvas>
        </div>

        {/* Virtual screen content - this appears on the MacBook screen */}
        <div 
            className="fixed top-0 left-0 h-screen w-full z-20"
            style={{
                opacity: isTransitioning && !isZoomed ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out',
                pointerEvents: isTransitioning && !isZoomed ? 'auto' : 'none',
            }}
        >
            <div className="w-full h-full flex items-center justify-center bg-secondary text-customtext">
                <div className="text-center transform scale-75">
                    <h1 className="text-6xl font-bold mb-8">Amechi Aduba</h1>
                    <h2 className="text-3xl mb-4">Full Stack Developer</h2>
                    <p className="text-xl">Scroll to explore my portfolio</p>
                </div>
            </div>
        </div>

        <div 
            style={{height: '115vh'}}
            className="bg-secondary"
        />
    
        {/* Main Content */}
        <main
            className="relative z-20"
            style={{
                opacity: isZoomed ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                pointerEvents: isZoomed ? 'auto' : 'none'
            }}
        >   
            
        <section id="about" className="min-h-screen flex items-center justify-center bg-secondary text-customtext py-16">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-8">About Me</h2>
            <p className="text-xl mb-8">I'm a passionate developer with expertise in React, Three.js, and modern web technologies. I love creating immersive and interactive web experiences that push the boundaries of what's possible on the web.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-tertiary p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Frontend</h3>
                <p>React, Three.js, Tailwind CSS, JavaScript, TypeScript</p>
              </div>
              <div className="bg-tertiary p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Backend</h3>
                <p>Node.js, Express, MongoDB, Firebase, AWS</p>
              </div>
              <div className="bg-tertiary p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Other</h3>
                <p>3D Modeling, UI/UX Design, Animation, Git</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="projects" className="min-h-screen flex items-center justify-center bg-tertiary text-customtext py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {Projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-300">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-secondary text-customtext text-sm px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 justify-center">
                      {project.demoUrl && project.demoUrl !== "https://your-demo-link.com" && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-primary text-customtext px-4 py-2 rounded hover:bg-secondary transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-customtext text-primary px-4 py-2 rounded hover:bg-gray-900 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="contact" className="min-h-screen flex items-center justify-center bg-quaternary text-customtext py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
            <p className="max-w-lg mx-auto mb-8 text-xl">I'm always open to new opportunities and interesting projects. Feel free to reach out!</p>
            
            <div className="max-w-md mx-auto bg-tertiary p-8 rounded-lg shadow-lg">
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full p-3 bg-quaternary rounded" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full p-3 bg-quaternary rounded" />
                </div>
                <div>
                  <textarea placeholder="Your Message" rows="5" className="w-full p-3 bg-quaternary rounded"></textarea>
                </div>
                <button className="w-full bg-quaternary text-customtext py-3 rounded font-bold">Send Message</button>
              </form>
            </div>
            
            <div className="mt-12 flex justify-center space-x-4">
              <a href="https://github.com/amechi-aduba" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a>
              <a href="https://www.linkedin.com/in/amechi-aduba/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a>
              <span className="text-gray-200">Email: amechia99@gmail.com</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
