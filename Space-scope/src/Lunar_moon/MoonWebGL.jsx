import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

/* ===========================
   Moon Sphere
=========================== */
const MoonSphere = ({ illumination }) => {
  const texture = useTexture("/textures/moon_8k.jpg");

  // Convert illumination → phase angle
  const phaseAngle = Math.acos(illumination / 100);

  return (
    <>
      {/* Sun light */}
      <directionalLight
        position={[
          Math.cos(phaseAngle) * 5,
          0,
          Math.sin(phaseAngle) * 5,
        ]}
        intensity={1.4}
      />

      {/* Ambient bounce */}
      <ambientLight intensity={0.15} />

      {/* Moon */}
      <mesh>
        <sphereGeometry args={[2.5, 128, 128]} />
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
   WebGL Canvas Wrapper
=========================== */
const MoonWebGL = ({ illumination }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["black"]} />

      <MoonSphere illumination={illumination} />

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default MoonWebGL;
