require("dotenv").config();

const isJsdom = process.env.TESTING_ENV === "jsdom";

let setupFiles = [];
if (isJsdom) {
  setupFiles.push("<rootDir>/jest-setup.ts");
}

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  testMatch: [
    isJsdom
      ? "**/src/**/?(*.)+(spec|test).[jt]s?(x)"
      : "**/rules/**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@root/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: [...setupFiles],
};
