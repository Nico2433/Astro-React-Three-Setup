import { type GL } from "@/three";
import { useEffect, useState } from "react";
import * as THREE from "three";
import TCanvasContainer from "./ui/TCanvasContainer";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  > {}

const CanvasWrapper: React.FC<Readonly<Props>> = ({ ...props }) => {
  const [gl, setGl] = useState<GL | null>(null);
  const getInstance = (gl: GL) => setGl(gl);

  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: "black" });
  const cube = new THREE.Mesh(geometry, material);

  useEffect(() => {
    if (!gl) return;

    const scene = gl.scene;

    scene.add(cube);
  }, [gl]);

  return <TCanvasContainer controllable getInstance={getInstance} {...props} />;
};

export default CanvasWrapper;
