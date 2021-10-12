import React, { Suspense, useEffect, useRef } from 'react';
import '../App.css';
import { useLoader, useFrame, Canvas } from 'react-three-fiber';
import { OrbitControls, Stars } from "drei";
import {  TextureLoader } from 'three';
import moonPic from '../assets/moon.jpg';
import normalPic from '../assets/normal.jpg';
import pabloPic from '../assets/me-boxed.jpg'

const Space = (props) => {


    const handleScroll = (ref) => {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
        ref.current.rotation.z += 0.005;

    }


    const PabloCube = (props) => {

        const ref = useRef();

        const pabloTexture = useLoader(TextureLoader, pabloPic)

        useEffect(() => {
            window.addEventListener("scroll",() => handleScroll(ref));
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
            <mesh
            {...props}
            ref={ref}
            >
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial
                    map={pabloTexture}
                />
                </mesh>
        )
    }


    const Moon = (props) => {

        const ref = useRef();

        const moon = useLoader(TextureLoader, moonPic);
        const normal = useLoader(TextureLoader, normalPic);

        useEffect(() => {
            window.addEventListener("scroll",() => handleScroll(ref));
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
            <mesh 
            {...props}
            ref={ref}
            >
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial
                    map={moon}
                    normalMap={normal}
                />
            </mesh>
        )
    }





    const Box = (props) => {
        const ref = useRef();

        useEffect(() => {
            window.addEventListener("scroll",() => handleScroll(ref));
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);


        return (
            <mesh
                {...props}
                ref={ref}

            >
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        )
    }

    
    const Halo = (props) => {

        const haloMesh = useRef();

        useFrame(() => {
            haloMesh.current.rotation.x += 0.002;
            haloMesh.current.rotation.y += 0.005;
            haloMesh.current.rotation.z += 0.002;
        });

        return (
            <mesh
                {...props}
                ref={haloMesh}
            >
                <torusGeometry args={[10, 3, 16, 50]} />
                <meshStandardMaterial color="red" />
            </mesh>
        )
    }



    // function moveCamera() {
        // const t = document.body.getBoundingClientRect().top;
        // moon.rotation.x += 0.05;
        // moon.rotation.y += 0.075;
        // moon.rotation.z += 0.05;

        // jeff.rotation.y += 0.01;
        // jeff.rotation.z += 0.01;

        // camera.position.z = t * -0.01;
        // camera.position.x = t * -0.0002;
        // camera.rotation.y = t * -0.0002;
    // }

    // document.body.onscroll = moveCamera;
    // moveCamera();



    return (

        <Canvas camera={{ position: [-3, 0, 30] }}>
            <OrbitControls />

            <pointLight color="#ffffff" position={[5, 5, 5]} />
            <ambientLight color="#ffffff" />

            <Stars />
            <Suspense fallback={null}>
                <Moon position={[-10, 0, 30]} />
                <PabloCube position={[2, 0, -5]} />
            </Suspense>
            <Box position={[-5, 5, 10]} />
            <Box position={[2, -5, 8]} />
            <Halo />
        </Canvas>

    );
}
export default Space;