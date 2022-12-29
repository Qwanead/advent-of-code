import {
  hasThreeVowels, hasDoubleLetter, containDisallowedStr, isNiceStr, getNiceStrCount,
} from './niceString';
import resultInput from './input';

describe('hasThreeVowels', () => {
  const testCases: [string, boolean][] = [
    ['ugknbfddgicrmopn', true],
    ['aei', true],
    ['xazegov', true],
    ['aeiouaeiouaeiou', true],
    ['', false],
    ['ugknbfddgicrmpn', false],
    ['dvszwmarrgswjxmb', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(hasThreeVowels(input)).toBe(result);
    });
  });
});

describe('hasDoubleLetter', () => {
  const testCases: [string, boolean][] = [
    ['xx', true],
    ['abcdde', true],
    ['aabbccdd', true],
    ['ugknbfddgicrmopn', true],
    ['', false],
    ['jchzalrnumimnmhp', false],
    ['dvszwmargswjxmb', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(hasDoubleLetter(input)).toBe(result);
    });
  });
});

describe('containDisallowedStr', () => {
  const testCases: [string, boolean][] = [
    ['abcdde', true],
    ['aabbccdd', true],
    ['', false],
    ['ugknbfddgicrmopn', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(containDisallowedStr(input)).toBe(result);
    });
  });
});

describe('isNiceStr', () => {
  const testCases: [string, boolean][] = [
    ['ugknbfddgicrmopn', true],
    ['aaa', true],
    ['', false],
    ['jchzalrnumimnmhp', false],
    ['haegwjzuvuyypxyu', false],
    ['dvszwmarrgswjxmb', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(isNiceStr(input)).toBe(result);
    });
  });
});

describe('getNiceStrCount', () => {
  it('result test', () => {
    expect(getNiceStrCount(resultInput)).toBe(258);
  });
});
