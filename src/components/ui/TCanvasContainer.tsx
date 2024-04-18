import type { GL } from "@/three";
import { TCanvas } from "@/three";
import { useEffect, useRef } from "react";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  > {
  getInstance: (gl: GL) => any;
  controllable?: boolean;
}

const TCanvasContainer: React.FC<Readonly<Props>> = ({
  getInstance,
  controllable,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const canvas = new TCanvas(ref.current, controllable);
    getInstance(canvas.gl);

    const onBeforeUnload = () => canvas.dispose();

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return <div ref={ref} {...rest}></div>;
};

export default TCanvasContainer;
