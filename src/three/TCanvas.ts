import { Color, type ColorRepresentation } from "three";
import { GL, OC } from "./core";
import { loadAssets, type Asset } from "./utils";

type AssetsType = {};

class TCanvas {
  gl: GL;
  private controls?: OC | null;
  private assets: AssetsType = {};

  constructor(container: HTMLElement, controllable?: boolean) {
    const gl = new GL(container);
    this.gl = gl;

    if (controllable) this.controls = new OC(gl);
  }

  async init(bgColor: ColorRepresentation) {
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

  getAsset<T extends Asset>(assetName: keyof AssetsType) {
    const asset: T = this.assets[assetName];
    return asset;
  }

  dispose() {
    this.gl.dispose();
  }
}

export { TCanvas };
