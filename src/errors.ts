import { Token } from "./lexer";

export class JluaError extends Error {
  constructor(message: string, position: Number) {
    super(`${message} from line ${position}`);

    Object.setPrototypeOf(this, JluaError.prototype);
  }
}
