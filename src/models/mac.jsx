import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

//import macScene from '../assets/mac-scene.jpg'

const Mac = ({progress = 0, modelPath, ...rest}) => {
    const group = useRef();

    const { nodes, materials } = useGLTF(modelPath)
    const screenImg = useTexture('/src/assets/img/macScreen.png')
    const gradientImg = useTexture('/src/assets/img/macScreen2.png')
    
    const screenMaterial = useMemo(() => {
        const m = materials['screen.001'].clone();
        m.map = screenImg;
        m.map.flipY = false;
        m.transparent = true;
        return m;
    }, [materials, screenImg]);

    // screenMaterial.map = screenImg
    // screenMaterial.map.flipY = false
    // screenMaterial.emissive = new THREE.Color('#111827');

    const gradientTex = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
        g.addColorStop(0, '#111827');
        g.addColorStop(1, '#1f2937');

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const tex = new THREE.CanvasTexture(canvas);
        tex.flipY = false;
        return tex;
    }, []);

    const screenMaterial2 = useMemo(() => {
        const m = materials['screen.001'].clone();
        m.map = gradientImg;
        m.map.flipY = false;
        m.transparent = true;
        return m;
    }, [materials, screenImg]);

    const [activeMaterial, setActiveMaterial] = useState(screenMaterial);

    useEffect(() => {
        if (progress * 1.4 > 0.5) {
            const blendFactor = Math.min((progress * 1.4 - .5) * 2, 1);

            if (blendFactor > 0.6) {
                setActiveMaterial(screenMaterial2);
            } else {
                setActiveMaterial(screenMaterial);
            }
        }
        else {
            setActiveMaterial(screenMaterial);
            screenMaterial.opacity = 1;
            screenMaterial.emissiveIntensity = 0;
        }
    }, [progress, gradientTex, screenMaterial, gradientTex]);
    

    const { val } = useSpring({ 
        val: progress * 1.4, 
        config: { tension: 120, friction: 25 } 
    });


    const CLOSED_POS = [0, .1, 3];
    const OPENED_POS = [0, 2.965, -0.13];
    const CLOSED_ROT = 9.75 / Math.PI;                     /*10 / -Math.PI;*/
    const OPEN_ROT = Math.PI/2;                     /*Math.PI / 2;  */

    const posY = val.to([0, 1], [CLOSED_POS[1], OPENED_POS[1]]);
    const posZ = val.to([0, 1], [CLOSED_POS[2], OPENED_POS[2]]);
    const rotX = val.to([0, 1], [CLOSED_ROT, OPEN_ROT]);

    return (
        <group ref={group} {...rest} dispose={null}>
            {/* base & hinge pivot (unchanged) */}
            <group position={[0.002, -0.040, 0.414]} rotation={[0.014, 0, 0]}>
                {/* opened laptop */}
                {/*</group><group position={[0, 2.965, -0.13]} rotation={[Math.PI / 2, 0, 0]}> */}
                {/* closed laptop */}
                <a.group 
                    position-x={0} 
                    position-y={posY}
                    position-z={posZ}
                    rotation-x={rotX}
               > 
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008.geometry}
                    material={materials.aluminium}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008_1.geometry}
                    material={materials['matte.001']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube008_2.geometry}
                    material={activeMaterial}
                />
                </a.group>
            </group>

            {/* keyboard / base meshes (exporter defaults) */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.keyboard.geometry}
                material={materials.keys}
                position={[1.793, 0, 3.451]}
            />
            <group position={[0, -0.1, 3.394]}>
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={materials.aluminium}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002_1.geometry}
                material={materials.trackpad}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.touchbar.geometry}
                material={materials.touchbar}
                position={[0, -0.027, 1.201]}
            />
        </group>
    )
}

useGLTF.preload('/src/assets/3d/mac-draco.glb')

export default Mac;
