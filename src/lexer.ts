import { JluaError } from "./errors";

export class Token {
  value: string;
  start: number;
  type: TokenType;

  constructor(value: string, start: number, type: TokenType) {
    this.value = value;
    this.start = start;
    this.type = type;
  }
}

export enum TokenType {
  IDENTIFIER,
  NUMBER,
  QUOTE,
  PLUS,
  MINUS,
  ASTERISK,
  SLASH,
  COMMA,
  COLON,
  LEFT_PARENTHESIS,
  RIGHT_PARENTHESIS,
  LEFT_SQUARE_BRACKET,
  RIGHT_SQUARE_BRACKET,
  LEFT_CURLY_BRACE,
  RIGHT_CURLY_BRACE,
  STRING,
  EOF,
}

const TokenTypeMap: Record<string, TokenType> = {
  '"': TokenType.QUOTE,
  "(": TokenType.LEFT_PARENTHESIS,
  ")": TokenType.RIGHT_PARENTHESIS,
  "[": TokenType.LEFT_SQUARE_BRACKET,
  "]": TokenType.RIGHT_SQUARE_BRACKET,
  "{": TokenType.LEFT_CURLY_BRACE,
  "}": TokenType.RIGHT_CURLY_BRACE,
  "+": TokenType.PLUS,
  "-": TokenType.MINUS,
  "*": TokenType.ASTERISK,
  "/": TokenType.SLASH,
  ":": TokenType.COLON,
  ",": TokenType.COMMA,
};

const validAscii = /[a-zA-Z0-9_]/;
const validNumberStart = /[0-9.]/;
const validNumber = /[0-9.E+_]/;
const validWhitespace = /[\t\r\n ]/;
const validSymbol = /[+\-*\/%^&#|<>~=(){}[\]:;,.]/;

export const lex = (source: string): Token[] => {
  let idx = 0;
  const tokens: Token[] = [];

  const testWhileBounded = (test: (character: string) => boolean) => {
    while (idx < source.length) {
      if (test(source[idx])) {
        idx++;
      } else {
        break;
      }
    }
  };

  while (idx < source.length) {
    const character = source[idx];

    if (validSymbol.test(character)) {
      tokens.push(new Token(character, idx++, TokenTypeMap[character]));
    } else if (validNumberStart.test(character)) {
      const start = idx;

      testWhileBounded((c) => validNumber.test(c));

      tokens.push(
        new Token(source.substring(start, idx), start, TokenType.NUMBER),
      );
    } else if (character === '"' || character === "'") {
      const start = idx++;

      testWhileBounded((c) => c !== character);

      tokens.push(
        new Token(source.substring(start, ++idx), start, TokenType.STRING),
      );
    } else if (validAscii.test(character)) {
      const start = idx;

      testWhileBounded((c) => validAscii.test(c));

      tokens.push(
        new Token(source.substring(start, idx), start, TokenType.IDENTIFIER),
      );
    } else if (validWhitespace.test(character)) {
      idx++;
    } else {
      throw new JluaError(
        `Invalid character \`${character}\` found while lexing.`,
        idx,
      );
    }
  }

  tokens.push(new Token("", idx, TokenType.EOF));

  return tokens;
};
