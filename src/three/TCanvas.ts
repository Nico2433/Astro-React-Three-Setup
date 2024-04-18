import * as THREE from "three";
import { GL, OC } from "./core";
import { loadAssets, type Assets } from "./utils";

class TCanvas {
  gl: GL;
  private controls?: OC | null;
  private container: HTMLElement;
  private assets: Assets = {};

  constructor(container: HTMLElement, controllable?: boolean) {
    const { offsetWidth: width, offsetHeight: height } = container;

    this.container = container;

    const gl = new GL(width, height);
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

  private init(bgColor?: string) {
    if (bgColor !== "rgba(0, 0, 0, 0)") {
      const color = new THREE.Color(bgColor ? bgColor : "#012");
      this.gl.scene.background = color;
    }

    this.gl.setup(this.container);
    this.gl.camera.position.z = 1.5;
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
