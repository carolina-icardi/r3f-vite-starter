import { Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = () => {
  return (
    <> 
   <OrbitControls />
    <Avatar />
    <Environment preset="city" /> 
    
     {/*  <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>  */}
    </>
  );
};
