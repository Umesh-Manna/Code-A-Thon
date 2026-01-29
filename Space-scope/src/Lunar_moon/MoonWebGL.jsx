import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { fetchMoonNow } from "./api";

/* ===========================
   Moon Sphere Component
=========================== */
const Moon = ({ illumination }) => {
  const texture = useTexture("/textures/moon_2k.jpg");

  // Convert illumination → phase angle
  const phaseAngle = Math.acos(illumination / 100);

  return (
    <>
      {/* Directional sunlight */}
      <directionalLight
        position={[
          Math.cos(phaseAngle) * 5,
          0,
          Math.sin(phaseAngle) * 5,
        ]}
        intensity={1.4}
        color="#ffffff"
      />

      {/* Ambient bounce */}
      <ambientLight intensity={0.1} />

      {/* Moon mesh */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </>
  );
};

/* ===========================
   Main WebGL Page
=========================== */
const MoonWebGL = () => {
  const [illumination, setIllumination] = useState(50);

  useEffect(() => {
    fetchMoonNow(0, 0).then((data) => {
      setIllumination(data.illumination);
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["black"]} />

        <Moon illumination={illumination} />

        {/* Controls (disable zoom for realism) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default MoonWebGL;
