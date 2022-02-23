import {
  SceneConfig,
  SkyPath,
  ArrowPosition,
  ArrowRotation,
  SkyRotationNormalization,
} from "./types";

const buildR = <T extends Record<string, SkyPath>>(t: T) => t;

const R = buildR({
  "1": "/renders/render0001.jpg",
  "2": "/renders/render0002.jpg",
  "3": "/renders/render0003.jpg",
  "4": "/renders/render0004.jpg",
  "5": "/renders/render0005.jpg",
  "6": "/renders/render0006.jpg",
  "7": "/renders/render0007.jpg",
  "8": "/renders/render0008.jpg",
  "9": "/renders/render0009.jpg",
  "10": "/renders/render0010.jpg",
  "11": "/renders/render0011.jpg",
  "12": "/renders/render0012.jpg",
  "13": "/renders/render0013.jpg",
  "14": "/renders/render0014.jpg",
  "15": "/renders/render0015.jpg",
  "16": "/renders/render0016.jpg",
});

// The type of content that each totem will hold for a SPECIFIC project
// the content of this interface is just an example
export interface ExampleStandInformation {
  id?: string;
  info: {
    name: string;
  };
  videos: string[];
  pdfs: string[];
}

// Array of render paths
export const renderPaths = Object.keys(R).map((k) => R[k as keyof typeof R]);

// To lock types on a Record<T,U>
const buildStandsInformation = <
  T extends Record<string, ExampleStandInformation>
>(
  t: T
) => t;

export const StandsInformation = buildStandsInformation({
  FIME: {
    info: {
      name: "FIME",
    },
    videos: [],
    pdfs: [],
  },
});

export const buildStandFromRender = <
  T extends Partial<Record<keyof typeof R, keyof typeof StandsInformation>>
>(
  t: T
) => t;

export const standFromRender = buildStandFromRender({
  "1": "FIME",
});

const buildSceneConfigs = <
  T extends Record<SkyPath, SceneConfig<ExampleStandInformation>>
>(
  t: T
) => t;

export const SceneConfigs: Record<
  SkyPath,
  SceneConfig<ExampleStandInformation>
> = {
  [R[1]]: {
    skyRotation: SkyRotationNormalization.northToNorth,
    navigators: [
      {
        rotation:"-87 -101 143",
        position: "-1.4 -3.5 4.7",
        type: "hotspot",
        to: R[11],
      },
      
      {
        rotation:"-0.8  80 3.6",
        position: "-11 0.4 -2.6",
        type: "hotspot",
        to: R[2],
      },
    ],
    totems: [
    ],
  },
  [R[2]]: {
    skyRotation: SkyRotationNormalization.northToNorth,
    navigators: [
      {
        rotation: "1.8 88 -0.1",
        position: "-10 0.1 0.5",
        type: "hotspot",
        to: R[3],
      },
      {
        rotation: "-2 25 -2.4",
        position: "-4.8 0.7 -11",
        type: "hotspot",
        to: R[4],
      },
      {
        rotation: "-3.9 179 0",
        position: "1.5 1.7 9.1",
        type: "hotspot",
        to: R[6],
      },
      {
        rotation: "3 -92 -0.2",
        position: "11 1.1 2.2",
        type: "hotspot",
        to: R[1],
      },
      
    ],
    totems: [],
  },
  [R[3]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "5.2 161 178",
        position:"-3.7 0.7 10",
        type: "hotspot",
        to: R[2],
      },
      {
        rotation: "-7.6 -113 176",
        position:"11 1.1 3.4",
        type: "hotspot",
        to: R[4],
      },
    ],
    totems: [],
  },
  [R[4]]: {
    skyRotation: SkyRotationNormalization.northToNorth,
    navigators: [
      {
        rotation: "-1.6 0.1 -89",
        position: "-1.2 0.6 -10",
        type: "hotspot",
        to: R[5],
      },
     {
        rotation: "5 -91 -90",
        position: "12 1.2 -1",
        type: "hotspot",
        to: R[3],
      },
    ],
    totems: [],
  },
  [R[5]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "-2.3 147 53",
        position: "-5.2 0.3 9.9",
        type: "hotspot",
        to: R[4],
      },
    
     
      
    ],
    totems: [],
  },
  [R[6]]: {
    skyRotation: SkyRotationNormalization.southToNorth,
    navigators: [
      {
        rotation: "1 -43 -89",
        position:"6.1 0.8 -8.1",
        type: "hotspot",
        to: R[10],
      },
      {
        rotation: "-0.79 -114 -88",
        position:"7.9 1.4 4.1",
        type: "hotspot",
        to: R[2],
      },
      {
        rotation: "1 140 -89",
        position:"-3.2 0.3 10 ",
        type: "hotspot",
        to: R[9],
      },
      {
        rotation: "1 140 -89",
        position:"-9.2 0.3 5.7 ",
        type: "hotspot",
        to: R[8],
      },
    ],
    totems: [],
  },
  [R[7]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation:"-15 -37 3.1 ",
        position: "5 0.2 -10",
        type: "hotspot",
        to: R[10],
      },
      {
        rotation: "-15 -37 3.1 ",
        position: "7.9 0.2 -7.7",
        type: "hotspot",
        to: R[9],
      },
      {
        rotation: "-15 149 3 ",
        position: "-6.3 1.1 10",
        type: "hotspot",
        to: R[8],
      },
      {
        rotation: "-3.9 89 2.8 ",
        position: "-14 0.6 1",
        type: "hotspot",
        to: R[1],
      },
    ],
    totems: [],
  },
  [R[8]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "-1.4 -176 1.4",
        position: "0.5 1.3 8.6",
        type: "hotspot",
        to: R[6],
      },
    ],
    totems: [],
  },[R[9]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "1.5 1.9 0",
        position:"0 1.5 -9",
        type: "hotspot",
        to: R[6],
      },
    ],
    totems: [],
  },
  [R[10]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "-6.3 138 -4",
        position: "-6.2 1 7.5",
        type: "hotspot",
        to: R[6],
      },
    ],
    totems: [],
  },
  [R[11]]: {
    skyRotation: SkyRotationNormalization.westToNorth,
    navigators: [
      {
        rotation: "-6.3 138 -4",
        position: "-10 1 6 ",
        type: "hotspot",
        to: R[14],
      },
      {
        rotation: "-6.3 82 -4",
        position: "-13 1 0 ",
        type: "hotspot",
        to: R[13],
      },
      {
        rotation: "-87 113 -10",
        position: "-4.1 -3.1 3.5 ",
        type: "hotspot",
        to: R[1],
      },
    ],
    totems: [],
  },
  [R[12]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "-6.3 138 -4",
        position: "-6.2 1 7.5",
        type: "hotspot",
        to: R[6],
      },
    ],
    totems: [],
  },
  [R[13]]: {
    skyRotation: SkyRotationNormalization.southToNorth,
    navigators: [
      {
        rotation: "-6.3 177 -4",
        position: "-1.6 0.4 8.7 ",
        type: "hotspot",
        to: R[16],
      },
      {
        rotation: "-7.9 -73 -4.3",
        position: "9 1.6 -1.4 ",
        type: "hotspot",
        to: R[14],
      },
      {
        rotation: "-72 -19 -71",
        position: "3.7 -2.1 -5.8 ",
        type: "hotspot",
        to: R[11],
      },
      
    ],
    totems: [],
  },
  [R[14]]: {
    skyRotation: SkyRotationNormalization.westToNorth,
    navigators: [
      {
        rotation: "-6.3 71 -4",
        position: "-6.3 1.1 -1.9",
        type: "hotspot",
        to: R[15],
      },
      {
        rotation: "-6.3 -65 -4",
        position: "5.5 0.8 -4.2",
        type: "hotspot",
        to: R[11],
      },
    ],
    totems: [],
  },
  [R[15]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "-86 -111 -107",
        position: "4.7 -1.6 2.1",
        type: "hotspot",
        to: R[14],
      },
      {
        rotation: "-1.6 -5.8 -7.4",
        position: "2.7 2 -8.4",
        type: "hotspot",
        to: R[16],
      },
    ],
    totems: [],
  },
  [R[16]]: {
    skyRotation: SkyRotationNormalization.eastToNorth,
    navigators: [
      {
        rotation: "-83 -132 -39",
        position: "7 -1.4 7",
        type: "hotspot",
        to: R[13],
      },
      {
        rotation: "-83 -132 -39",
        position: "1.3 -1.4 8.5",
        type: "hotspot",
        to: R[15],
      },
    ],
    totems: [],
  },
};
