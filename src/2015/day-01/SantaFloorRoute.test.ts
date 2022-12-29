import SantaFloorRoute from './SantaFloorRoute';
import resultInput from './input';

describe('getTargetFloor', () => {
  const testCases: [string, number][] = [
    ['', 0],
    ['2r4fr(afh9824)24fr', 0],
    ['(())', 0],
    ['()()', 0],
    ['(((', 3],
    ['(()(()(', 3],
    ['))(((((', 3],
    ['())', -1],
    ['))(', -1],
    [')))', -3],
    [')())())', -3],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const santaRoute = new SantaFloorRoute(input);
      expect(santaRoute.getTargetFloor()).toBe(result);
    });
  });

  it('result test', () => {
    const santaRoute = new SantaFloorRoute(resultInput);
    expect(santaRoute.getTargetFloor()).toBe(232);
  });
});

describe('findStep', () => {
  const testCases: [string, number][] = [
    [')', 1],
    ['()())', 5],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const santaRoute = new SantaFloorRoute(input);
      expect(santaRoute.findStep()).toBe(result);
    });
  });

  it('null result', () => {
    const santaRoute = new SantaFloorRoute('(((((())');
    expect(santaRoute.findStep()).toBeNull();
  });

  it('result test', () => {
    const santaRoute = new SantaFloorRoute(resultInput);
    expect(santaRoute.findStep()).toBe(1783);
  });
});
