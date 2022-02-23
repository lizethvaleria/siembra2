/**
 * General purpose types, if you need to declare types for a specific config
 * goto SceneConfig.ts
 */

// Sometimes we need to rotate skies to make them face the correct direction,
// use this as a helper to accomplish that
export enum SkyRotationNormalization {
  southToNorth = "0 180 0",
  eastToNorth = "0 90 0",
  westToNorth = "0 -90 0",
 northToNorth = "0 -180 0",
}

// A helper to set arrow's positions in a more readable way
export const ArrowPosition = {
  Up: (r: number) => `-${r} -1 0`,
  Down: (r: number) => `${r} -1 0`,
  Right: (r: number) => `0 -1 -${r}`,
  Left: (r: number) => `0 -1 ${r}`,
  Custom: (r: number, deg: number) => {
    deg = deg + 90;
    const x = Math.sin(deg / 57.3) * r;
    const z = Math.cos(deg / 57.3) * r;
    return `${-1 * x} -1 ${-1 * z}`;
  },
};

// A helper to set arrow's rotations in a more readable way
export const ArrowRotation = {
  Up: "-90 90 0",
  Down: "-90  -90 0",
  Right: "-90  0 0",
  Left: "-90  180 0",
  Custom: (deg: number) => {
    const normalizedRotation = 90;
    return `-90 ${normalizedRotation + deg} 0`;
  },
};

// Navigators are the arrows and hotspots we use to move
// between skies
export type Navigator = {
  type: "arrow" | "hotspot";
  position: string;
  rotation: string;
  to: string;
};

export type Totem<T> = {
  position: string;
  rotation: string;
  content: T;
};

export type SceneConfig<T> = {
  skyRotation?: string;
  navigators: Navigator[];
  totems: Totem<T>[];
};

// Just a type to have a more friendly name and avoid confusion (:
export type SkyPath = string;

export interface TotemProps<T> {
  content: T;
  position: string;
  rotation: string;
}

export type Asset = {
  src: string;
  type: "img" | "video";
};
