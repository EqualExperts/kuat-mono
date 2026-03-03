import { expect, afterEach } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/vue";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
