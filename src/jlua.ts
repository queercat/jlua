import { lex } from "./lexer";

const source: string = `return 1, true, 2, false, 3, 4`;

const ast = parse(lex(source));

console.log(ast);
