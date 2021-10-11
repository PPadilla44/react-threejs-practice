import React, { Suspense, useEffect, useRef, useState } from 'react';
import '../App.css';
import { useLoader, useFrame, Canvas, useThree } from 'react-three-fiber';
import { OrbitControls, Stars, Torus } from "drei";
import { log, TextureLoader } from 'three';
import moonPic from '../assets/moon.jpg';
import normalPic from '../assets/normal.jpg';
import pabloPic from '../assets/me-boxed.jpg'

const Space = () => {

    const get = useThree();



    function PabloCube() {



        const ref = useRef();

        // useFrame((state, delta) => (ref.current.rotation.x += 0.1))

        const pabloTexture = useLoader(TextureLoader, pabloPic)

        const rotate = e => {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }

        document.body.onscroll = rotate;

        return (
            <mesh
                position={[2, 0, -5]}
                ref={ref}
            >
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial
                    map={pabloTexture}
                />
                </mesh>
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





    const Box = (props) => {
        // This reference will give us direct access to the mesh
        const boxMesh = useRef();

        // Set up state for the hovered and active state
        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)

        const rotate = e => {
            boxMesh.current.rotation.x += 0.01;
            boxMesh.current.rotation.y += 0.01;
        }

        document.body.onscroll = rotate;

        // useFrame(() => {

        //     boxMesh.current.rotation.x += 0.01;
        //     boxMesh.current.rotation.y += 0.01;

        // });

        // Subscribe this component to the render-loop, rotate the mesh every frame
        // Return view, these are regular three.js elements expressed in JSX
        return (
            <mesh
                {...props}
                ref={boxMesh}
                onClick={(event) => setActive(!active)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
            >
                <boxGeometry args={active ? [10, 10, 10,] : [5, 5, 5]} />
                <meshStandardMaterial color={hovered ? "red" : "blue"} />
            </mesh>
        )
    }



    function moveCamera() {
        const t = document.body.getBoundingClientRect().top;
        // moon.rotation.x += 0.05;
        // moon.rotation.y += 0.075;
        // moon.rotation.z += 0.05;

        // jeff.rotation.y += 0.01;
        // jeff.rotation.z += 0.01;

        // camera.position.z = t * -0.01;
        // camera.position.x = t * -0.0002;
        // camera.rotation.y = t * -0.0002;
        console.log(t);
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    useEffect(() => {
        console.log(get);
    },[get])

    return (

        <Canvas camera={{ position: [-3, 0, 30] }}>
            <OrbitControls />

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
            <Box position={[-5, 5, 10]} />
            <Box position={[2, -5, 8]} />
        </Canvas>

    );
}
export default Space;