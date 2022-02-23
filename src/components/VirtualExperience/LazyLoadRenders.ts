import { SceneConfig, Navigator } from "./config/types";

export const LazyLoadRenders = (
  initialSky: string,
  currentSkies: string[],
  sceneConfig: Record<string, SceneConfig<unknown>>,
  depth: number
) => {
  const actualRenders = [...currentSkies];
  const initialNavigators = sceneConfig[initialSky].navigators;
  const pushRFNIfNeeded = (n: Navigator) => {
    if (!n) return;
    if (!actualRenders.includes(n.to)) {
      actualRenders.push(n.to);
    }
  };
  const pushNavigatorsIfPossible = (na: Navigator[], currDepth: number) => {
    if (currDepth === depth) return;
    na.forEach(pushRFNIfNeeded);
    const navigators = na.map((naa) => {
      if (!sceneConfig[naa.to]) return []; // If this config isn't implemented yet return
      return sceneConfig[naa.to].navigators;
    });
    navigators.forEach((ns) => pushNavigatorsIfPossible(ns, currDepth + 1));
  };
  pushNavigatorsIfPossible(initialNavigators, 0);
  return actualRenders;
};
