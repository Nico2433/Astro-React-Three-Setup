import type { GL } from "@/three";
import { useEffect, useRef, useState } from "react";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import TCanvasContainer from "./TCanvasContainer";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  > {}

const CanvasWrapper: React.FC<Readonly<Props>> = ({ ...props }) => {
  const initialRender = useRef<boolean>(true);

  const [gl, setGl] = useState<GL | null>(null);
  const getInstance = (gl: GL) => setGl(gl);

  const geometry = new BoxGeometry(10, 10, 10);
  const material = new MeshBasicMaterial({ color: "skyblue" });
  const cube = new Mesh(geometry, material);

  useEffect(() => {
    if (!gl) return;
    if (!initialRender.current) return;

    const scene = gl.scene;

    scene.add(cube);

    gl.setStats();

    gl.requestAnimationFrame(() => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      gl.render();
    });

    initialRender.current = false;
  }, [gl]);

  return <TCanvasContainer controllable getInstance={getInstance} {...props} />;
};

export default CanvasWrapper;
