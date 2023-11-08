/// <reference types="vite/client" />

import { UnprocessedGame } from "./types";

declare module "./mocks/source.json" {
  const value: UnprocessedGame[];
  export default value;
}
