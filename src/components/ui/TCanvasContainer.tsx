import { TCanvas } from "@/three";
import { useEffect, useRef, useState } from "react";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "ref"
  > {
  getProps: (canvas: TCanvas | null) => any;
  controllable?: boolean;
}

const TCanvasContainer: React.FC<Readonly<Props>> = ({
  getProps,
  controllable,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<TCanvas | null>(null);

  useEffect(() => {
    const loadCanvas = async () => {
      if (!ref.current) return;

      const newCanvas = new TCanvas(ref.current, controllable);
      await newCanvas.init();

      setCanvas(newCanvas);
    };

    if (!canvas) loadCanvas();

    getProps(canvas);

    const onBeforeUnload = () => canvas?.dispose();

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [canvas]);

  return <div ref={ref} {...rest}></div>;
};

export default TCanvasContainer;
