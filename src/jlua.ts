import {lex} from "./lexer";

const source: string = `var cool_variable_123 = print("hello world 123");`

const tokens = lex(source)

console.log(tokens)