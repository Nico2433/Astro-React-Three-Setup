import { Color } from "three";
import { GL, OC } from "./core";
import { loadAssets, type Assets } from "./utils";

class TCanvas {
  gl: GL;
  private controls?: OC | null;
  private assets: Assets = {};

  constructor(container: HTMLElement | null, controllable?: boolean) {
    if (!container) throw new Error("Canvas container cannot be null");

    const gl = new GL(container);
    this.gl = gl;

    if (controllable) this.controls = new OC(gl);

    const bgColor = window
      .getComputedStyle(container)
      .getPropertyValue("background-color");

    loadAssets(this.assets).then(() => {
      this.init(bgColor);
      this.gl.requestAnimationFrame(this.anime);
    });
  }

  private init(bgColor: string) {
    if (bgColor !== "rgba(0, 0, 0, 0)") {
      const color = new Color(bgColor);
      this.gl.scene.background = color;
    }

    this.gl.setup();
    this.gl.camera.position.z = 20;
  }

  private anime = () => {
    this.controls?.update();
    this.gl.render();
  };

  dispose() {
    this.gl.dispose();
  }
}

export { TCanvas };
