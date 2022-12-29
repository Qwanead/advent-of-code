import GiftBoxes from './GiftBoxes';
import { getBoxSquare, getRibbonLength } from './GiftBoxes';
import type { BoxDimensions } from './GiftBoxes';
import resultInput from './input';

describe('Convert string to box dimensions', () => {
  const testCases: Array<[string, BoxDimensions[]]> = [
    ['2x3x4', [[2, 3, 4]]],
    ['2x3x4\n1x1x10', [[2, 3, 4], [1, 1, 10]]],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const giftBoxes = new GiftBoxes(input);
      expect(giftBoxes['boxSizes']).toStrictEqual(result);
    });

  });
});

describe('getBoxSquare', () => {
  const testCases: [string, number][] = [
    ['2x3x4', 58],
    ['1x1x10', 43],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const giftBoxes = new GiftBoxes(input);
      const [boxSize] = giftBoxes['boxSizes'];
      expect(getBoxSquare(boxSize)).toStrictEqual(result);
    });
  });
});

describe('getBoxSquareSum', () => {
  it('1x1x10\n2x3x4 => 101', () => {
    const giftBoxes = new GiftBoxes('1x1x10\n2x3x4');
    expect(giftBoxes.getBoxSquareSum()).toStrictEqual(101);
  });

  it('result test', () => {
    const giftBoxes = new GiftBoxes(resultInput);
    expect(giftBoxes.getBoxSquareSum()).toStrictEqual(1586300);
  });
});

describe('getRibbonLength', () => {
  const testCases: [string, number][] = [
    ['2x3x4', 34],
    ['1x1x10', 14],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const giftBoxes = new GiftBoxes(input);
      const [boxSize] = giftBoxes['boxSizes'];
      expect(getRibbonLength(boxSize)).toStrictEqual(result);
    });
  });
});

describe('getRibbonLengthSum', () => {
  it('1x1x10\n2x3x4 => 48', () => {
    const giftBoxes = new GiftBoxes('1x1x10\n2x3x4');
    expect(giftBoxes.getRibbonLengthSum()).toStrictEqual(48);
  });

  it('result test', () => {
    const giftBoxes = new GiftBoxes(resultInput);
    expect(giftBoxes.getRibbonLengthSum()).toStrictEqual(3737498);
  });
});
