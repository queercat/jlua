import { Token } from "./lexer";
import { Block, Chunk, ReturnStatement, Statement } from "./types";

export class Parser {
  parse = (tokens: Token[]) => {};

  parseBlock = (): Block => {
    const statements: Statement[] = [];
    let returnStatement: ReturnStatement | undefined;

    return new Block(statements, returnStatement);
  };

  idx: number;

  constructor() {
    this.idx = 0;
  }
}
