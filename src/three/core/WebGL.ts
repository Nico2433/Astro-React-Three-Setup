import type * as THREE from "three";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

class WebGL {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  private stats?: Stats;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    const { offsetWidth: width, offsetHeight: height } = container;
    this.container = container;

    const aspect = width / height;

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, aspect, 0.01, 100);

    window.addEventListener("resize", this.handleResize);
  }

  private handleResize = () => {
    const { offsetWidth: width, offsetHeight: height } = this.container;

    const aspect = width / height;
    this.camera.aspect = aspect;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  setup() {
    this.container.appendChild(this.renderer.domElement);
  }

  setStats() {
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);
  }

  getMesh(name: string) {
    return this.scene.getObjectByName(name);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  requestAnimationFrame(callback: () => void) {
    this.renderer.setAnimationLoop(() => {
      this.stats?.update();
      callback();
    });
  }

  cancelAnimationFrame() {
    this.renderer.setAnimationLoop(null);
  }

  dispose() {
    this.cancelAnimationFrame();
    this.scene?.clear();
  }
}

export { WebGL as GL };
