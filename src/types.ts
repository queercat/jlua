/** - Chunk - **/

class Chunk {
    block: Block

    constructor(block: Block) {
        this.block = block
    }
}

/** - Block - **/

class Block {
    statements: Statement[];
    returnStatement?: ReturnStatement

    constructor(statements: Statement[], returnStatement?: ReturnStatement) {
        this.statements = statements
        this.returnStatement = returnStatement
    }
}

/** - Statement - **/

class Statement {}

class VariableAssignmentStatement extends Statement {
    variableList: VariableList
    expressionList: ExpressionList

    constructor(variableList: VariableList, expressionList: ExpressionList) {
        super();

        this.variableList = variableList
        this.expressionList = expressionList
    }
}

class FunctionCallStatement extends Statement {
    functionCall: FunctionCall

    constructor(functionCall: FunctionCall) {
        super();

        this.functionCall = functionCall
    }
}

class LabelStatement extends Statement {
    label: Label

    constructor(label: Label) {
        super();

        this.label = label
    }
}

class BreakStatement extends Statement {}

class GotoStatement extends Statement {
    name: Name

    constructor(name: Name) {
        super();

        this.name = name
    }
}

class DoBlockEndStatement extends Statement {
    block: Block

    constructor(block: Block) {
        super();

        this.block = block
    }
}

class WhileExpressionDoBockEndStatement extends Statement {
    expression: Expression
    block: Block

    constructor(expression: Expression, block: Block) {
        super();

        this.expression = expression
        this.block = block
    }
}

class RepeatBlockUntilExpressionStatement extends Statement {
    block: Block
    expression: Expression

    constructor(block: Block, expression: Expression) {
        super();

        this.block = block
        this.expression = expression
    }
}

class IfThenElseIfEndStatement extends Statement {
    expressionsBlocks: [expression: Expression, block: Block][]
    elseExpression?: Expression

    constructor(expressionBlocks: [expression: Expression, block: Block][], elseExpression?: Expression) {
        super();

        this.expressionsBlocks = expressionBlocks
        this.elseExpression = elseExpression
    }
}

class ForNameExpressionDoBlockEndStatement extends Statement {
    name: Name
    initializer: Expression
    limit: Expression
    increment?: Expression

    constructor(name: Name, initializer: Expression, limit: Expression, increment: Expression) {
        super();

        this.name = name
        this.initializer = initializer
        this.limit = limit
        this.increment = increment
    }
}

class ForNameInExpressionListDoBlockEndStatement extends Statement {
    nameList: NameList
    expressionList: ExpressionList
    block: Block

    constructor(names: NameList, expressions: ExpressionList, block: Block) {
        super();

        this.nameList = names
        this.expressionList = expressions
        this.block = block
    }
}

class FunctionNameBodyStatement extends Statement {
    functionName: FunctionName
    functionBody: FunctionBody

    constructor(functionName: FunctionName, functionBody: FunctionBody) {
        super();

        this.functionName = functionName
        this.functionBody = functionBody
    }
}

class LocalFunctionNameFunctionBodyStatement extends Statement {
    functionName: Name
    functionBody: FunctionBody

    constructor(functionName: Name, functionBody: FunctionBody) {
        super();

        this.functionName = functionName
        this.functionBody = functionBody
    }
}

class LocalAttributeNameListStatement extends Statement {
    attributeNameList: AttributeNameList
    expressionList?: ExpressionList

    constructor(attributeNameList: AttributeNameList, expressionList?: ExpressionList) {
        super();

        this.attributeNameList = attributeNameList
        this.expressionList = expressionList
    }
}

/** - Attribute Name List - **/

class AttributeNameList {
    namesAttributes: [name: Name, attribute: Attribute][]

    constructor(nameAttributes: [name: Name, attribute: Attribute][]) {
        this.namesAttributes = nameAttributes
    }
}

/** - Attribute - **/

class Attribute {
    name?: Name

    constructor(name?: Name) {
        this.name = name
    }
}

/** - Return Statement - **/

class ReturnStatement {
    expressionList: ExpressionList

    constructor(expressionList: ExpressionList) {
        this.expressionList = expressionList
    }

}

/** - Label - **/

class Label {
    name: Name

    constructor(name: Name) {
        this.name = name
    }
}

/** - Function Name - **/

class FunctionName {
    names: Name[]
    endingName?: Name

    constructor(names: Name[], endingName?: Name) {
        this.names = names
        this.endingName = endingName
    }
}

/** - Name - **/

class Name {
    value: string = ""
}

/** - Variable - **/

class Variable {}

class NameVariable extends Variable {
    name: any
}

class PrefixExpressionExpressionVariable extends Variable {}

class PrefixExpressionNameVariable extends Variable {}

/** - Variable List - **/

class VariableList {
    variables: Variable[]

    constructor(variables: Variable[]) {
        this.variables = variables
    }
}

/** - NameList - */

class NameList {
    constructor(names: Name[]) {
        this.names = names
    }

    names: Name[]
}

/** - Expression List - **/

class ExpressionList {
    expressions: Expression[]

    constructor(expressions: Expression[]) {
        this.expressions = expressions
    }
}

/** - Expression - **/

class Expression {}

class NilExpression extends Expression {
    value: NilLiteral = new NilLiteral()
}

class BooleanExpression extends Expression {
    value: BooleanLiteral

    constructor(value: BooleanLiteral) {
        super();
        this.value = value
    }
}

class NumeralExpression extends Expression {

}

class StringLiteralExpression extends Expression {
    stringLiteral: StringLiteral

    constructor(stringLiteral: StringLiteral) {
        super();

        this.stringLiteral = stringLiteral
    }
}

class VariadicExpression extends Expression {}

class PrefixExpressionExpression extends Expression {
    prefixExpression: PrefixExpression

    constructor(prefixExpression: PrefixExpression) {
        super();

        this.prefixExpression = prefixExpression
    }

}

/** - Prefix Expression **/

class PrefixExpression {}

class VariablePrefixExpression extends PrefixExpression {
    value: Variable = {}
}

class FunctionCallPrefixExpression extends PrefixExpression {

}

class ExpressionPrefixExpression extends PrefixExpression {
    value: Expression = {}
}

/** - Function Call - **/

class FunctionCall {}

class PrefixArgumentsFunctionCall extends FunctionCall {
    prefixExpression: PrefixExpression
    arguments: Arguments

    // @ts-ignore
    constructor(prefixExpression: PrefixExpression, arguments: Arguments) {
        super();

        this.prefixExpression = prefixExpression
        this.arguments = arguments
    }
}

class PrefixNameArgumentsFunctionCall extends FunctionCall {
    prefixExpression: PrefixExpression
    arguments: Arguments

    // @ts-ignore
    constructor(prefixExpression: PrefixExpression, arguments: Arguments) {
        super();

        this.prefixExpression = prefixExpression
        this.arguments = arguments
    }
}

/** - Argument - **/

class Arguments {}

/** - Function Definition - **/

class FunctionDefinition {
    functionBody: FunctionBody

    constructor(functionBody: FunctionBody) {
        this.functionBody = functionBody
    }
}

/** - Function Body - **/

class FunctionBody {
}

/** - Parameter List - **/

class ParameterList {}

class NamedVariadicParameterList extends  ParameterList{
    nameList: NameList
    variadicLiteral?: VariadicLiteral

    constructor(nameList: NameList, variadicLiteral: VariadicLiteral) {
        super()
        this.nameList = nameList
        this.variadicLiteral = variadicLiteral
    }
}

class VariadicParameterList extends ParameterList {}

/** - Table Constructor - **/

class TableConstructor {
    fieldList?: FieldList

    constructor(fieldList: FieldList) {
        this.fieldList = fieldList
    }
}

/** - Field List - **/

class FieldList {
    fields: Field[]

    constructor(fields: Field[]) {
        this.fields = fields
    }
}

/** - Field - **/

class Field {}

class ExpressionKeyValueExpressionField extends Field {
    key: Expression
    value: Expression

    constructor(key: Expression, value: Expression) {
        super()
        this.key = key
        this.value = value
    }
}

class NameKeyValueExpressionField extends Field {
    key: Name
    value: Expression

    constructor(key: Name, value: Expression) {
        super();

        this.key = key
        this.value = value
    }
}

class ExpressionField extends Field {
    expression: Expression

    constructor(expression: Expression) {
        super();
        this.expression = expression
    }
}

/** - Binary Operator - **/

enum BinaryOperator {
    PLUS,
    MINUS,
    ASTERISK,
    SLASH,
    DOUBLE_SLASH,
    CARROT,
    PERCENT,
    AMPERSAND,
    TILDE,
    PIPE,
    DOUBLE_ARROW_RIGHT,
    DOUBLE_ARROW_LEFT,
    DOUBLE_PERIOD,
    LESS_THAN,
    LESS_THAN_EQUALS,
    GREATER_THAN,
    GREATER_THAN_EQUALS,
    DOUBLE_EQUALS,
    TILDE_EQUALS,
    AND,
    OR
}

/** - Unary Operator - **/

enum UnaryOperator {
    MINUS,
    NOT,
    POUND,
    TILDE
}

/** - Literal - **/

class Literal {}

class BooleanLiteral extends Literal {
    value: boolean

    constructor(value: boolean) {
        super()
        this.value = value
    }
}

class StringLiteral extends Literal {
    value: string

    constructor(value: string) {
        super()
        this.value = value
    }
}

class NilLiteral extends Literal {
    value: null = null
}

class VariadicLiteral extends Literal{}

// TODO: this is not conformant to the Lua numeric constant spec.
class NumberLiteral extends Literal {
    value: number

    public constructor(value: number) {
        super()
        this.value = value
    }
}
