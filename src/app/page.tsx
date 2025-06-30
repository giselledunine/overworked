"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Model } from "../../components/Gltf/ChineseGuyBaked";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="h-[100vh] w-full">
            <audio
                className="z-10 border-1 border-white"
                src={"/mouseClick.mp3"}
                autoPlay
                loop></audio>
            <Canvas
                shadows
                camera={{
                    fov: 50,
                }}>
                <directionalLight
                    intensity={1}
                    position={[1, 1, 0]}></directionalLight>
                <color args={["#000"]} attach={"background"}></color>
                <Suspense fallback={null}>
                    <Model scale={0.1}></Model>
                </Suspense>
                <Camera></Camera>
                <EffectComposer>
                    <DepthOfField
                        focusDistance={0}
                        focalLength={0.002}
                        bokehScale={5}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
{
    /* <CameraControls></CameraControls> */
}
// function Light() {
//     const dirLight = useRef();
//     useHelper(dirLight, PointLightHelper, 0.1, "red");
//     return (
//         <pointLight
//             intensity={0.3}
//             position={[-0.2, 0.5, 0.6]}
//             ref={dirLight}
//             color={"#9CD0E7"}></pointLight>
//     );
// }

function Camera() {
    const camera = useThree((state) => state.camera);
    const { position, rotation } = useControls("Camera", {
        position: {
            value: { x: -0.5, y: 0.84, z: 0.8 },
            step: 0.01,
        },
        rotation: {
            value: { x: -0.6, y: -0.5, z: -0.3 },
            step: 0.01,
        },
    });
    useFrame(() => {
        camera.position.set(position.x, position.y, position.z);
        camera.rotation.set(rotation.x, rotation.y, rotation.z);
    });
    return <></>;
}
