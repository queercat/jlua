import { expect, test } from "vitest";
import { lex, Token, TokenType } from "./lexer";

const eofToken = (end: number): Token => new Token("", end, TokenType.EOF);

test("lexer with empty string should emit EOF token", () => {
  const tokens = lex("");

  expect(tokens).toEqual([eofToken(0)]);
});

test("lexer with simple source should emit correct tokens", () => {
  const tokens = lex("3.1415 + 19268");

  const expected = [
    new Token("3.1415", 0, TokenType.NUMBER),
    new Token("+", 7, TokenType.PLUS),
    new Token("19268", 9, TokenType.NUMBER),
    eofToken(14),
  ] as Token[];

  expect(tokens).toEqual(expected);
});

test("lexer with string should emit correct tokens", () => {
  const tokens = lex('"hello world"');
});

test("lexer with multiple kinds of strings should emit correct tokens", () => {
  const source = `"hello" + 'world'`;
  const tokens = lex(source);

  const expected = [
    new Token('"hello"', 0, TokenType.STRING),
    new Token("+", 8, TokenType.PLUS),
    new Token("'world'", 10, TokenType.STRING),
    eofToken(source.length),
  ];

  expect(tokens).toEqual(expected);
});

test("lexer with reasonably complex input should emit correct tokens", () => {
  const source: string = `print\n\n\n\t\t\t\t\r\r\r\n("3.1415" + "9268"  'Twilight Sparkle')["Princess" \t,\r 'Celestia']`;
  const output = lex(source).map((t) => [t.type, t.value]);

  const expected = [
    [TokenType.IDENTIFIER, "print"],
    [TokenType.LEFT_PARENTHESIS, "("],
    [TokenType.STRING, '"3.1415"'],
    [TokenType.PLUS, "+"],
    [TokenType.STRING, '"9268"'],
    [TokenType.STRING, "'Twilight Sparkle'"],
    [TokenType.RIGHT_PARENTHESIS, ")"],
    [TokenType.LEFT_SQUARE_BRACKET, "["],
    [TokenType.STRING, '"Princess"'],
    [TokenType.COMMA, ","],
    [TokenType.STRING, "'Celestia'"],
    [TokenType.RIGHT_SQUARE_BRACKET, "]"],
    [TokenType.EOF, ""],
  ] as [TokenType, string][];

  expect(output).toEqual(expected);
});
