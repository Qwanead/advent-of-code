import SantaRoute from './SantaRoute';
import { getUniquePointCountForTwoSanta } from './SantaRoute';
import type { Cord } from './SantaRoute';
import resultInput from './input';

describe('check currentCord and uniqueRoutePoints', () => {
  const testCases: [string, Cord, Cord[]][] = [
    ['>', [1, 0], [[0, 0], [1, 0]]],
    ['><', [0, 0], [[0, 0], [1, 0]]],
    ['>>', [2, 0], [[0, 0], [1, 0], [2, 0]]],
  ];

  testCases.forEach(([input, currentCord, uniqueRoutePoints]) => {
    it(`${input} => ${currentCord}`, () => {
      const santaRoute = new SantaRoute(input);
      expect(santaRoute['currentCord']).toStrictEqual(currentCord);
      expect(santaRoute['uniqueRoutePoints']).toStrictEqual(uniqueRoutePoints);
    });
  });
});

describe('getUniquePointCount', () => {
  const testCases: [string, number][] = [
    ['>', 2],
    ['^>v<', 4],
    ['^v^v^v^v^v', 2],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const santaRoute = new SantaRoute(input);
      expect(santaRoute.getUniquePointCount()).toStrictEqual(result);
    });
  });

  it('result test', () => {
    const santaRoute = new SantaRoute(resultInput);
    expect(santaRoute.getUniquePointCount()).toStrictEqual(2081);
  });
});

describe('getUniquePointCountForTwoSanta', () => {
  const testCases: [string, number][] = [
    ['^v', 3],
    ['^>v<', 3],
    ['^v^v^v^v^v', 11],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(getUniquePointCountForTwoSanta(input)).toStrictEqual(result);
    });
  });

  it('result test', () => {
    expect(getUniquePointCountForTwoSanta(resultInput)).toStrictEqual(2341);
  });
});
