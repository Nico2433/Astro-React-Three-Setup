import type { TCanvas } from "@/three";
import { useEffect, useRef, useState } from "react";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import TCanvasContainer from "./TCanvasContainer";

const CanvasWrapper: React.FC = ({ ...props }) => {
  const initialRender = useRef<boolean>(true);

  const [canvas, setCanvas] = useState<TCanvas | null>(null);
  const getProps = (canvas: TCanvas | null) => setCanvas(canvas);

  const geometry = new BoxGeometry(10, 10, 10);
  const material = new MeshBasicMaterial({ color: "skyblue" });
  const cube = new Mesh(geometry, material);

  useEffect(() => {
    if (!canvas || !initialRender.current) return;
    const gl = canvas.gl;
    const scene = gl.scene;

    gl.setStats();

    gl.requestAnimationFrame(() => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      gl.render();
    });

    scene.add(cube);

    initialRender.current = false;
  }, [canvas]);

  return <TCanvasContainer controllable getProps={getProps} {...props} />;
};

export default CanvasWrapper;
