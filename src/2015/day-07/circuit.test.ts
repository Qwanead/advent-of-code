import resultInput from './input';
import { parse } from './circuit';
import type { Wires } from './circuit';

describe('parse', () => {
  const testCases: [string, Wires][] = [
    ['123 -> x', { x: 123 }],
    ['123 -> x\n456 -> y', { x: 123, y: 456 }],
    ['123 -> x\n456 -> y\nx AND y -> d', { x: 123, y: 456, d: 72 }],
    ['NOT 123 -> f', { f: 65412 }],
    [
      '123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i',
      {
        d: 72,
        e: 507,
        f: 492,
        g: 114,
        h: 65412,
        i: 65079,
        x: 123,
        y: 456,
      },
    ],
    ['123 -> x\nx -> y\ny -> d', { x: 123, y: 123, d: 123 }],
    [
      'x AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\n123 -> x\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i\n456 -> y',
      {
        d: 72,
        e: 507,
        f: 492,
        g: 114,
        h: 65412,
        i: 65079,
        x: 123,
        y: 456,
      },
    ],
  ];

  testCases.forEach(([input, result]) => {
    it(`\n${input}`, () => {
      expect(parse(input)).toEqual(result);
    });
  });

});

describe('result test', () => {
  it('part one', () => {
    // console.log(parse(resultInput));
    expect(parse(resultInput).a).toEqual(46065);
  });
  // it('part two', () => {
  //   expect(parse('').a).toEqual(14134);
  // });
});
