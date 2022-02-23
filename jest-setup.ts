window = window || {};
window.scrollTo = jest.fn();

global = global || {};
// @ts-ignore
global.console = {
  warn: jest.fn(),
  log: console.log,
};
import "@testing-library/jest-dom";
