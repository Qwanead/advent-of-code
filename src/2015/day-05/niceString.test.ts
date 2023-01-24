import {
  hasThreeVowels, hasDoubleLetter, containDisallowedStr,
  isNiceStr, getNiceStrCount, hasDoublePair,
  hasRepeatsLetter, isNiceStrVersionTwo,
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

describe('hasDoublePair', () => {
  const testCases: [string, boolean][] = [
    ['xyxy', true],
    ['aabcdefgaa', true],
    ['', false],
    ['aaa', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(hasDoublePair(input)).toBe(result);
    });
  });
});

describe('hasRepeatsLetter', () => {
  const testCases: [string, boolean][] = [
    ['xyx', true],
    ['abcdefeghi', true],
    ['', false],
    ['aaz', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(hasRepeatsLetter(input)).toBe(result);
    });
  });
});

describe('isNiceStr', () => {
  const testCases: [string, boolean][] = [
    ['qjhvhtzxzqqjkmpb', true],
    ['xxyxx', true],
    ['', false],
    ['uurcxstgmygtbstg', false],
    ['ieodomkazucvgmuy', false],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(isNiceStrVersionTwo(input)).toBe(result);
    });
  });
});

describe('getNiceStrCountVersionTwo', () => {
  it('result test', () => {
    expect(getNiceStrCount(resultInput, isNiceStrVersionTwo)).toBe(53);
  });
});
