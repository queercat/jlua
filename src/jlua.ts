import { lex } from "./lexer";
import { Parser } from "./parser";

const source: string = `return 1, true, 2, false, 3, 4`;
const parser = new Parser();

const ast = parser.parse(lex(source));

console.log(ast);
