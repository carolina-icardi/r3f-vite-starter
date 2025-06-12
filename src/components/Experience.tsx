import { Environment, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import React from "react";
import { useThree } from "@react-three/fiber";

export const Experience: React.FC = () => {
  const texture = useTexture("texture/Sfondo1.png");
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      <Avatar position={[0, -1.8, 0]} scale={2} />
      <Environment preset="warehouse" />
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
        <meshBasicMaterial map={texture} side={2} />
      </mesh>
    </>
  );
};
