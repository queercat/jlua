import { Token } from "./lexer";
import {JluaError, JluaUnexpectedEofError} from "./errors";
import {
    Block,
    BooleanLiteral, BreakStatement,
    Expression,
    ExpressionList, Label, LabelStatement, Name, NameVariable,
    NilLiteral,
    NumberLiteral, PrefixExpression,
    ReturnStatement,
    Statement
} from "./types";

const assertNotAtEnd = (tokens: Token[]) => {
    if (tokens[0]?.eof ?? true) {
        throw new JluaUnexpectedEofError("Unexpected EOF.", tokens[0] ?? { start: -1 })
    }
}

const peekAhead = (tokens: Token[], doAssertNotEnd: boolean = false): Token | undefined => {
    if (doAssertNotEnd) { assertNotAtEnd(tokens.slice(1)) }

    return tokens[1]
}

const peek = (tokens: Token[], doAssertNotEnd: boolean = false): Token | undefined => {
    if (doAssertNotEnd) { assertNotAtEnd(tokens) }

    return tokens[0]
}

const advance = (tokens: Token[], doAssertNotEnd: boolean = false): Token | undefined => {
    if (doAssertNotEnd) { assertNotAtEnd(tokens) }

    const token = tokens[0]

    tokens.shift()

    return token
}

const maybeConsume = (tokens: Token[], target: string) => {
    if (!lookFor(tokens, target)) return false

    tokens.shift()

    return true
}

const lookFor = (tokens: Token[], target: string) => {
    return peek(tokens)?.value === target
}

export const parse = (tokens: Token[]) => {
    return parseBlock(tokens)
}

const parseBlock = (tokens: Token[]): Block => {
    const statements: Statement[] = []
    let returnStatement: ReturnStatement | undefined

    while (tokens.length > 0) {
        const atEnd = lookFor(tokens, "return")

        if (atEnd) { returnStatement = parseReturnStatement(tokens); if (tokens.length > 1) { throw new JluaError("Expected EOF but found more.", tokens[0]?.start ?? -1)} break; }

        statements.push(parseStatement(tokens))
    }

    return new Block(statements, returnStatement)
}


const parseReturnStatement = (tokens: Token[]): ReturnStatement => {
    advance(tokens)

    let earlyReturn = lookFor(tokens, ";")
    let expressionList = new ExpressionList([])

    if (!earlyReturn) { expressionList = parseExpressionList(tokens)}

    return new ReturnStatement(expressionList)
}

const parseList = <T>(tokens: Token[], parseFunction: (tokens: Token[]) => T, delimiter: string): T[] => {
    const list: T[] = []

    while (true) {
        list.push(parseFunction(tokens))
        advance(tokens)
        if (!lookFor(tokens, delimiter)) { break }
        advance(tokens)
    }

    return list
}


const parseExpressionList = (tokens: Token[]): ExpressionList => {
    const expressions = parseList<Expression>(tokens, parseExpression, ",")

    return new ExpressionList(expressions)
}

const parsePrefixExpression = (tokens: Token[]): PrefixExpression => {
    const isName
}

const parseVariable = (tokens: Token[]): Expression => {
    const isName = maybeConsume(tokens, "\"")

    if (isName) return new NameVariable(parseName(tokens))
}

const parseExpression = (tokens: Token[]): Expression => {
    const token = peek(tokens, true)!

    const numberRegex = /d/

    try { return new NumberLiteral(Number.parseFloat(token.value)) }
    catch (_) {}

    switch(token.value) {
        case "nil": return new NilLiteral()
        case "true": return new BooleanLiteral(true)
        case "false": return new BooleanLiteral(false)
    }

    throw new Error("Unimplemented exception.")
}

export const parseName = (tokens: Token[]): Name => {
    const token = peek(tokens, true)!

    // TODO: Handle actual name regex with removing keywords.
    const validName = /w+/

    // TODO: Create custom error.
    if (!validName.test(token.value)) { throw new Error("Invalid name for name.")}

    return new Name(token.value)
}

export const parseStatement = (tokens: Token[]): Statement => {
    const token = peek(tokens, true)!
    const nextToken = peekAhead(tokens)

    switch (token.value) {
        case ";": { break; }
        case "break": { return new BreakStatement() }
        case "label": { advance(tokens); const name = parseName(tokens); return new LabelStatement(new Label(name))  }
        case "\"": {

        }
    }

    switch ([token.value, nextToken?.value]) {

    }

    throw new Error("What a most vexing parse?\n" + [token, nextToken])
}