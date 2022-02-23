declare global {
  namespace jest {
    interface Matchers<R> {
      toDeny(): R;
      toAllow(): R;
    }
  }
}

export {};
