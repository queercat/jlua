export type Token = {
    value: string
    start: number
    end: number
}

const composeRegex = (...regex: RegExp[]) => new RegExp(regex.map(r => r.source).join("|"))

const validAscii = /[a-zA-z0-9_]+/
const validSymbol  = /[+\-*\/%^&#|<>~=(){}[\]:;,.'"]/

const validToken = composeRegex(validAscii, validSymbol)

export const lex = (source: string, offset: number = 0, matches: Token[] = []): Token[] => {
    const symbol = validToken[Symbol.match](source.substring(offset))

    if (!symbol) return matches

    matches.push({start: symbol.index! + offset, end: symbol.index! + offset + symbol[0].length, value: symbol[0]})

    return lex(source, offset + (symbol.index ?? 0) + symbol[0].length, matches)
}