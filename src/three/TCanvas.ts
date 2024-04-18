import { Color } from "three";
import { GL, OC } from "./core";
import { loadAssets } from "./utils";

type AssetsType = {};

class TCanvas {
  gl: GL;
  private controls?: OC | null;
  private assets: AssetsType = {};
  private container: HTMLElement;

  constructor(container: HTMLElement, controllable?: boolean) {
    this.container = container;

    const gl = new GL(container);
    this.gl = gl;

    if (controllable) this.controls = new OC(gl);
  }

  async init() {
    const bgColor = window
      .getComputedStyle(this.container)
      .getPropertyValue("background-color");

    await loadAssets(this.assets);

    if (bgColor !== "rgba(0, 0, 0, 0)") {
      const color = new Color(bgColor);
      this.gl.scene.background = color;
    }

    this.gl.setup();
    this.gl.camera.position.z = 20;

    this.gl.requestAnimationFrame(this.anime);
  }

  private anime = () => {
    this.controls?.update();
    this.gl.render();
  };

  getAsset<T extends AssetsType>(assetName: keyof AssetsType) {
    const asset: T = this.assets[assetName];
    return asset;
  }

  dispose() {
    this.gl.dispose();
  }
}

export { TCanvas };
