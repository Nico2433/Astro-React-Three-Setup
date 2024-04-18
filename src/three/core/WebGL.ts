import type * as THREE from "three";
import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

class WebGL {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  time = { delta: 0, elapsed: 0 };

  private clock = new Clock();
  private resizeCallback?: () => void;
  private stats?: Stats;
  private size: { width: number; height: number; aspect: number };

  constructor(width: number, height: number) {
    const aspect = width / height;
    this.size = { width, height, aspect };

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(40, aspect, 0.01, 100);

    window.addEventListener("resize", this.handleResize);
  }

  private handleResize = () => {
    this.resizeCallback && this.resizeCallback();

    const { width, height, aspect } = this.size;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  setup(container: HTMLElement) {
    container.appendChild(this.renderer.domElement);
  }

  setStats(container: HTMLElement) {
    this.stats = new Stats();
    container.appendChild(this.stats.dom);
  }

  setResizeCallback(callback: () => void) {
    this.resizeCallback = callback;
  }

  getMesh(name: string) {
    return this.scene.getObjectByName(name);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  requestAnimationFrame(callback: () => void) {
    this.renderer.setAnimationLoop(() => {
      this.time.delta = this.clock.getDelta();
      this.time.elapsed = this.clock.getElapsedTime();
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
