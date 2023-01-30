/* eslint-disable @typescript-eslint/no-loop-func */
export type Wires = { [wire: string]: number };
enum Operator {
  Assignment = '->',
  Not = 'NOT',
  And = 'AND',
  Or = 'OR',
  Lshift = 'LSHIFT',
  Rshift = 'RSHIFT',
}

const isStrNumber = (str: string) => {
  const integer = parseInt(str, 10);
  return str.length > 0 && !Number.isNaN(integer);
};

const isWireNumber = (wire: string, wires: Wires) => {
  return isStrNumber(wire) || wires[wire] !== undefined;
};

const getWireValue = (wire: string, wires: Wires) => isStrNumber(wire)
  ? parseInt(wire, 10) : wires[wire];

const unaryOperation = (operator: string, x: number) => {
  switch (operator) {
    case Operator.Not:
      const binaryStr = (x).toString(2);
      return parseInt(
        [...(new Array(16 - binaryStr.length).fill('0')), ...binaryStr]
          .map((bit) => bit === '1' ? '0' : '1')
          .join(''),
        2,
      );
    default:
      throw Error(`Unknown operator "${operator}"`);
  }
};

const binaryOperation = (x: number, operator: string, y: number) => {
  switch (operator) {
    case Operator.And:
      return x & y;
    case Operator.Or:
      return x | y;
    case Operator.Lshift:
      return x << y;
    case Operator.Rshift:
      return x >> y;
    default:
      throw Error(`Unknown operator "${operator}"`);
  }
};

export const parse = (input: string) => {
  const result: Wires = {};
  let commands = input.split('\n');
  let executedСommands: number[] = [];
  let count = 0;
  const LIMIT = 10000;

  do {
    count += 1;
    commands = commands.filter((_, i) => !executedСommands.includes(i));
    executedСommands = [];

    commands.forEach((command, index) => {
      const commandArr = command.split(' ');

      const isAssignment = commandArr.length === 3
        && (isStrNumber(commandArr[0]) || isWireNumber(commandArr[0], result))
        && commandArr[1] === Operator.Assignment;

      const isUnaryOperator = commandArr.length === 4
        && commandArr[2] === Operator.Assignment
        && commandArr[0] === Operator.Not
        && isWireNumber(commandArr[1], result);

      const isBinaryOperator = commandArr.length === 5
        && commandArr[3] === Operator.Assignment
        && isWireNumber(commandArr[0], result)
        && isWireNumber(commandArr[2], result);

      switch (true) {
        // y -> x
        case (isAssignment): {
          const [wire,, targetWire] = commandArr;
          result[targetWire] = getWireValue(wire, result);
          executedСommands.push(index);
          return;
        }
        // NOT x -> h
        case (isUnaryOperator): {
          const [operator, wire,, targetWire] = commandArr;
          result[targetWire] = unaryOperation(operator, getWireValue(wire, result));
          executedСommands.push(index);
          return;
        }
        // x OPERATOR y -> d
        case (isBinaryOperator): {
          const [wireX, operator, wireY,, targetWire] = commandArr;
          const x = getWireValue(wireX, result);
          const y = getWireValue(wireY, result);
          result[targetWire] = binaryOperation(x, operator, y);
          executedСommands.push(index);
          return;
        }
      }
    });
  } while (executedСommands.length !== 0 && count < LIMIT);

  if (count === LIMIT) {
    throw Error('Can\'t parse');
  }

  return result;
};
