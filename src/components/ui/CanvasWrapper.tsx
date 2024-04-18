import type { TCanvas } from "@/three";
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

  const [canvas, setCanvas] = useState<TCanvas | null>(null);
  const getProps = (canvas: TCanvas | null) => setCanvas(canvas);

  const geometry = new BoxGeometry(10, 10, 10);
  const material = new MeshBasicMaterial({ color: "skyblue" });
  const cube = new Mesh(geometry, material);

  useEffect(() => {
    if (!canvas) return;
    if (!initialRender.current) return;
    const gl = canvas.gl;

    const scene = gl.scene;
    scene.add(cube);

    gl.setStats();

    gl.requestAnimationFrame(() => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      gl.render();
    });

    initialRender.current = false;
  }, [canvas]);

  return <TCanvasContainer controllable getProps={getProps} {...props} />;
};

export default CanvasWrapper;
