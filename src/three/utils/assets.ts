import { resolvePath } from "@/utils";
import type * as THREE from "three";
import {
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  TextureLoader,
  VideoTexture,
} from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export type Assets = {
  [key in string]: {
    data?: THREE.Texture | THREE.VideoTexture | GLTF;
    path: string;
    encoding?: boolean;
    flipY?: boolean;
  };
};

export const loadAssets = async (assets: Assets) => {
  const textureLoader = new TextureLoader();
  const gltfLoader = new GLTFLoader();
  const rgbeLoader = new RGBELoader();

  const getExtension = (path: string) => {
    const s = path.split(".");
    return s[s.length - 1];
  };

  await Promise.all(
    Object.values(assets).map(async (v) => {
      const path = resolvePath(v.path);
      const extension = getExtension(path);

      if (["jpg", "png", "webp"].includes(extension)) {
        const texture = await textureLoader.loadAsync(path);
        texture.userData.aspect = texture.image.width / texture.image.height;

        v.encoding && (texture.colorSpace = SRGBColorSpace);
        v.flipY !== undefined && (texture.flipY = v.flipY);
        v.data = texture;
      } else if (["glb"].includes(extension)) {
        const gltf = await gltfLoader.loadAsync(path);
        v.data = gltf;
      } else if (["webm", "mp4"].includes(extension)) {
        const video = document.createElement("video");

        video.src = path;
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.preload = "metadata";
        video.playsInline = true;

        const texture = new VideoTexture(video);
        texture.userData.aspect = video.videoWidth / video.videoHeight;

        v.encoding && (texture.colorSpace = SRGBColorSpace);
        v.data = texture;
      } else if (["hdr"].includes(extension)) {
        const texture = await rgbeLoader.loadAsync(path);
        texture.mapping = EquirectangularReflectionMapping;

        v.data = texture;
      }
    })
  );
};
