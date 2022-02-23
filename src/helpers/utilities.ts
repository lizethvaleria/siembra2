export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const initializeFormErrors = <T extends Object>(
  obj: T
): Record<keyof T, string[]> => {
  const copyUnk = { ...obj } as unknown;
  const copy = copyUnk as Record<keyof T, string[]>;
  for (let key in copy) {
    copy[key] = [];
  }
  return copy;
};
