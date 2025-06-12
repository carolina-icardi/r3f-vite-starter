import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = () => {
  return (
    <> 
  
    <Avatar position={[0, -3, 5]} scale={2} />
    <Environment preset="warehouse" /> 
    
     {/*  <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>  */}
    </>
  );
};
