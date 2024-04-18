import type { GL } from "@/three";
import { useEffect, useState } from "react";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
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

  const geometry = new BoxGeometry(10, 10, 10);
  const material = new MeshBasicMaterial({ color: "black" });
  const cube = new Mesh(geometry, material);

  useEffect(() => {
    if (!gl) return;

    const scene = gl.scene;

    scene.add(cube);
  }, [gl]);

  return <TCanvasContainer controllable getInstance={getInstance} {...props} />;
};

export default CanvasWrapper;
