/** - Chunk - **/

export class Chunk {
  block: Block;

  constructor(block: Block) {
    this.block = block;
  }
}

/** - Block - **/

export class Block {
  statements: Statement[];
  returnStatement?: ReturnStatement;

  constructor(statements: Statement[], returnStatement?: ReturnStatement) {
    this.statements = statements;
    this.returnStatement = returnStatement;
  }
}

/** - Statement - **/

export class Statement {}

export class VariableAssignmentStatement extends Statement {
  variableList: VariableList;
  expressionList: ExpressionList;

  constructor(variableList: VariableList, expressionList: ExpressionList) {
    super();

    this.variableList = variableList;
    this.expressionList = expressionList;
  }
}

export class FunctionCallStatement extends Statement {
  functionCall: FunctionCall;

  constructor(functionCall: FunctionCall) {
    super();

    this.functionCall = functionCall;
  }
}

export class LabelStatement extends Statement {
  label: Label;

  constructor(label: Label) {
    super();

    this.label = label;
  }
}

export class BreakStatement extends Statement {}

export class GotoStatement extends Statement {
  name: Name;

  constructor(name: Name) {
    super();

    this.name = name;
  }
}

export class DoBlockEndStatement extends Statement {
  block: Block;

  constructor(block: Block) {
    super();

    this.block = block;
  }
}

export class WhileExpressionDoBockEndStatement extends Statement {
  expression: Expression;
  block: Block;

  constructor(expression: Expression, block: Block) {
    super();

    this.expression = expression;
    this.block = block;
  }
}

export class RepeatBlockUntilExpressionStatement extends Statement {
  block: Block;
  expression: Expression;

  constructor(block: Block, expression: Expression) {
    super();

    this.block = block;
    this.expression = expression;
  }
}

export class IfThenElseIfEndStatement extends Statement {
  expressionsBlocks: [expression: Expression, block: Block][];
  elseExpression?: Expression;

  constructor(
    expressionBlocks: [expression: Expression, block: Block][],
    elseExpression?: Expression,
  ) {
    super();

    this.expressionsBlocks = expressionBlocks;
    this.elseExpression = elseExpression;
  }
}

export class ForNameExpressionDoBlockEndStatement extends Statement {
  name: Name;
  initializer: Expression;
  limit: Expression;
  increment?: Expression;

  constructor(
    name: Name,
    initializer: Expression,
    limit: Expression,
    increment: Expression,
  ) {
    super();

    this.name = name;
    this.initializer = initializer;
    this.limit = limit;
    this.increment = increment;
  }
}

export class ForNameInExpressionListDoBlockEndStatement extends Statement {
  nameList: NameList;
  expressionList: ExpressionList;
  block: Block;

  constructor(names: NameList, expressions: ExpressionList, block: Block) {
    super();

    this.nameList = names;
    this.expressionList = expressions;
    this.block = block;
  }
}

export class FunctionNameBodyStatement extends Statement {
  functionName: FunctionName;
  functionBody: FunctionBody;

  constructor(functionName: FunctionName, functionBody: FunctionBody) {
    super();

    this.functionName = functionName;
    this.functionBody = functionBody;
  }
}

export class LocalFunctionNameFunctionBodyStatement extends Statement {
  functionName: Name;
  functionBody: FunctionBody;

  constructor(functionName: Name, functionBody: FunctionBody) {
    super();

    this.functionName = functionName;
    this.functionBody = functionBody;
  }
}

export class LocalAttributeNameListStatement extends Statement {
  attributeNameList: AttributeNameList;
  expressionList?: ExpressionList;

  constructor(
    attributeNameList: AttributeNameList,
    expressionList?: ExpressionList,
  ) {
    super();

    this.attributeNameList = attributeNameList;
    this.expressionList = expressionList;
  }
}

/** - Attribute Name List - **/

export class AttributeNameList {
  namesAttributes: [name: Name, attribute: Attribute][];

  constructor(nameAttributes: [name: Name, attribute: Attribute][]) {
    this.namesAttributes = nameAttributes;
  }
}

/** - Attribute - **/

export class Attribute {
  name?: Name;

  constructor(name?: Name) {
    this.name = name;
  }
}

/** - Return Statement - **/

export class ReturnStatement {
  expressionList: ExpressionList;

  constructor(expressionList: ExpressionList) {
    this.expressionList = expressionList;
  }
}

/** - Label - **/

export class Label {
  name: Name;

  constructor(name: Name) {
    this.name = name;
  }
}

/** - Function Name - **/

export class FunctionName {
  names: Name[];
  endingName?: Name;

  constructor(names: Name[], endingName?: Name) {
    this.names = names;
    this.endingName = endingName;
  }
}

/** - Name - **/

export class Name {
  name: string;

  constructor(value: string) {
    this.name = value;
  }
}

/** - Variable - **/

export class Variable {}

export class NameVariable extends Variable {
  name: Name;

  constructor(name: Name) {
    super();

    this.name = name;
  }
}

export class PrefixExpressionExpressionVariable extends Variable {}

export class PrefixExpressionNameVariable extends Variable {}

/** - Variable List - **/

export class VariableList {
  variables: Variable[];

  constructor(variables: Variable[]) {
    this.variables = variables;
  }
}

/** - NameList - */

export class NameList {
  constructor(names: Name[]) {
    this.names = names;
  }

  names: Name[];
}

/** - Expression List - **/

export class ExpressionList {
  expressions: Expression[];

  constructor(expressions: Expression[]) {
    this.expressions = expressions;
  }
}

/** - Expression - **/

export class Expression {}

export class NilExpression extends Expression {
  value: NilLiteral = new NilLiteral();
}

export class BooleanExpression extends Expression {
  value: BooleanLiteral;

  constructor(value: BooleanLiteral) {
    super();
    this.value = value;
  }
}

export class NumeralExpression extends Expression {}

export class StringLiteralExpression extends Expression {
  stringLiteral: StringLiteral;

  constructor(stringLiteral: StringLiteral) {
    super();

    this.stringLiteral = stringLiteral;
  }
}

export class VariadicExpression extends Expression {}

export class PrefixExpressionExpression extends Expression {
  prefixExpression: PrefixExpression;

  constructor(prefixExpression: PrefixExpression) {
    super();

    this.prefixExpression = prefixExpression;
  }
}

/** - Prefix Expression **/

export class PrefixExpression {}

export class VariablePrefixExpression extends PrefixExpression {
  value: Variable = {};
}

export class FunctionCallPrefixExpression extends PrefixExpression {}

export class ExpressionPrefixExpression extends PrefixExpression {
  value: Expression = {};
}

/** - Function Call - **/

export class FunctionCall {}

export class PrefixArgumentsFunctionCall extends FunctionCall {
  prefixExpression: PrefixExpression;
  arguments: Arguments;

  // @ts-ignore
  constructor(prefixExpression: PrefixExpression, argumentz: Arguments) {
    super();

    this.prefixExpression = prefixExpression;
    this.arguments = argumentz;
  }
}

export class PrefixNameArgumentsFunctionCall extends FunctionCall {
  prefixExpression: PrefixExpression;
  arguments: Arguments;

  // @ts-ignore
  constructor(prefixExpression: PrefixExpression, argumentz: Arguments) {
    super();

    this.prefixExpression = prefixExpression;
    this.arguments = argumentz;
  }
}

/** - Argument - **/

export class Arguments {}

/** - Function Definition - **/

export class FunctionDefinition {
  functionBody: FunctionBody;

  constructor(functionBody: FunctionBody) {
    this.functionBody = functionBody;
  }
}

/** - Function Body - **/

export class FunctionBody {}

/** - Parameter List - **/

export class ParameterList {}

export class NamedVariadicParameterList extends ParameterList {
  nameList: NameList;
  variadicLiteral?: VariadicLiteral;

  constructor(nameList: NameList, variadicLiteral: VariadicLiteral) {
    super();
    this.nameList = nameList;
    this.variadicLiteral = variadicLiteral;
  }
}

export class VariadicParameterList extends ParameterList {}

/** - Table Constructor - **/

export class TableConstructor {
  fieldList?: FieldList;

  constructor(fieldList: FieldList) {
    this.fieldList = fieldList;
  }
}

/** - Field List - **/

export class FieldList {
  fields: Field[];

  constructor(fields: Field[]) {
    this.fields = fields;
  }
}

/** - Field - **/

export class Field {}

export class ExpressionKeyValueExpressionField extends Field {
  key: Expression;
  value: Expression;

  constructor(key: Expression, value: Expression) {
    super();
    this.key = key;
    this.value = value;
  }
}

export class NameKeyValueExpressionField extends Field {
  key: Name;
  value: Expression;

  constructor(key: Name, value: Expression) {
    super();

    this.key = key;
    this.value = value;
  }
}

export class ExpressionField extends Field {
  expression: Expression;

  constructor(expression: Expression) {
    super();
    this.expression = expression;
  }
}

/** - Binary Operator - **/

export enum BinaryOperator {
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
  OR,
}

/** - Unary Operator - **/

export enum UnaryOperator {
  MINUS,
  NOT,
  POUND,
  TILDE,
}

/** - Literal - **/

export class Literal {}

export class BooleanLiteral extends Literal {
  value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }
}

export class StringLiteral extends Literal {
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }
}

export class NilLiteral extends Literal {
  value: null = null;
}

export class VariadicLiteral extends Literal {}

// TODO: this is not conformant to the Lua numeric constant spec.
export class NumberLiteral extends Literal {
  value: number;

  public constructor(value: number) {
    super();
    this.value = value;
  }
}
