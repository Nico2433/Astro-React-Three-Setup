import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { GL } from "./WebGL";

class OC {
  private orbitControls: OrbitControls;

  constructor(gl: GL) {
    this.orbitControls = new OrbitControls(gl.camera, gl.renderer.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.1;
  }

  get primitive() {
    return this.orbitControls;
  }

  disableDamping() {
    this.orbitControls.enableDamping = false;
  }

  update() {
    this.orbitControls.update();
  }
}

export { OC };
