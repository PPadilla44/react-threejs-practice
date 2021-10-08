import React, { Suspense, useEffect, useState } from 'react';
import '../App.css';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera, Stars, Torus } from "drei";
import { TextureLoader } from 'three';
import moonPic from '../assets/moon.jpg';
import normalPic from '../assets/normal.jpg';
import pabloPic from '../assets/me-boxed.jpg'

const Space = () => {
    
    const [goingUp, setGoingUp] = useState(false);


    const PabloCube = () => {

        const pabloTexture = useLoader(TextureLoader, pabloPic)
        let pabloMesh = (
            <mesh position={ [2, 0 , -5] } >
                <boxGeometry args={ [ 3,3,3 ] } />
                <meshStandardMaterial
                    map={pabloTexture}
                />
            </mesh>)
        console.log(pabloMesh);

        return (
            pabloMesh
        )
    }

    const Moon = () => {
        const moon = useLoader(TextureLoader, moonPic)
        const normal = useLoader(TextureLoader, normalPic)
        return (
            <mesh position={[-10, 0, 30]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial
                    map={moon}
                    normalMap={normal}
                />
            </mesh>
        )
    }

 


    const handleScroll = () => {
        console.log(document.body.getBoundingClientRect().top);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);

    return (

        <Canvas className="canvas"  >
            <OrbitControls />
            <PerspectiveCamera
                fov={75}
                near={0.1}
                far={1000}
                aspect={window.innerWidth / window.innerHeight}
                position={[-3, 0, 30]}
            >
                <Torus args={[10, 3, 16, 100]}>
                    <meshStandardMaterial attach="material" color="#ff6347" />
                </Torus>
                <pointLight color="#ffffff" position={[5, 5, 5]} />
                <ambientLight color="#ffffff" />

                <Stars />
                <Suspense fallback={null}>
                    <Moon />
                    <PabloCube />
                </Suspense>
            </PerspectiveCamera>
        </Canvas>

    );
}
export default Space;