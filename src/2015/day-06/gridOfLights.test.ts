import resultInput from './input';
import GridOfLights, {
  parse, Action, createGrid,
  LightStatus, countLight, GridOfBrightness,
} from './gridOfLights';
import type { Command, Grid } from './gridOfLights';

describe('parse', () => {
  const testCases: [string, Command][] = [
    ['turn off 301,3 through 808,453', [Action.Off, [301, 3], [808, 453]]],
    ['turn on 351,678 through 951,908', [Action.On, [351, 678], [951, 908]]],
    ['toggle 720,196 through 897,994', [Action.Toggle, [720, 196], [897, 994]]],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(parse(input)).toEqual(result);
    });
  });
});

describe('createGrid', () => {
  const testCases: [[number, number], number[][]][] = [
    [[1, 1], [[LightStatus.Off]]],
    [[2, 1], [[LightStatus.Off, LightStatus.Off]]],
    [[1, 2], [[LightStatus.Off], [LightStatus.Off]]],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(createGrid(...input)).toEqual(result);
    });
  });
});

describe('countLight', () => {
  const testCases: [Grid, number][] = [
    [[[LightStatus.On]], 1],
    [[[LightStatus.On], [LightStatus.On], [LightStatus.On]], 3],
    [[
      [LightStatus.On, LightStatus.On, LightStatus.On],
      [LightStatus.On, LightStatus.On, LightStatus.On],
      [LightStatus.On, LightStatus.On, LightStatus.On],
    ], 9],
    [[
      [LightStatus.On, LightStatus.Off, LightStatus.Off],
      [LightStatus.Off, LightStatus.On, LightStatus.Off],
      [LightStatus.Off, LightStatus.Off, LightStatus.On],
    ], 3],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(countLight(input)).toEqual(result);
    });
  });
});

describe('custom test', () => {
  it('1x1', () => {
    const gridOfLights = new GridOfLights(1, 1);
    gridOfLights.do('toggle 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(1);
    gridOfLights.do('toggle 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(0);
    gridOfLights.do('turn on 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(1);
    gridOfLights.do('turn on 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(1);
    gridOfLights.do('turn off 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(0);
    gridOfLights.do('turn off 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(0);
  });

  it('2x2', () => {
    const gridOfLights = new GridOfLights(2, 2);
    gridOfLights.do('turn on 0,0 through 1,0');
    expect(gridOfLights.countTurnOnLight()).toBe(2);
    gridOfLights.do('turn off 0,0 through 0,0');
    expect(gridOfLights.countTurnOnLight()).toBe(1);
  });

  it('3x3', () => {
    const gridOfLights = new GridOfLights(3, 3);
    gridOfLights.do('turn on 0,0 through 1,1');
    expect(gridOfLights.countTurnOnLight()).toBe(4);
    gridOfLights.do('toggle 1,1 through 2,2');
    expect(gridOfLights.countTurnOnLight()).toBe(6);
    gridOfLights.do('toggle 0,0 through 2,2');
    expect(gridOfLights.countTurnOnLight()).toBe(3);
  });
});

describe('turn on', () => {
  const testCases: [string, number][] = [
    ['turn on 0,0 through 999,999', 1000000],
    ['turn on 0,0 through 999,0', 1000],
    ['turn on 499,499 through 500,500', 4],
  ];

  testCases.forEach(([input, result]) => {
    const gridOfLights = new GridOfLights(1000, 1000);
    gridOfLights.do(input);
    it(`${input} => ${result}`, () => {
      expect(gridOfLights.countTurnOnLight()).toBe(result);
    });
  });
});

describe('gridOfBrightness', () => {
  const testCases: [string, number][] = [
    ['turn on 0,0 through 0,0', 1],
    ['toggle 0,0 through 999,999', 2000000],
  ];

  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      const gridOfBrightness = new GridOfBrightness(1000, 1000);
      gridOfBrightness.do(input);
      expect(gridOfBrightness.countTurnOnLight()).toBe(result);
    });
  });
});

describe('result test', () => {
  const gridOfLights = new GridOfLights(1000, 1000);
  const gridOfBrightness = new GridOfBrightness(1000, 1000);
  const commands = resultInput.split('\n');
  commands.forEach((command) => {
    gridOfLights.do(command);
    gridOfBrightness.do(command);
  });
  it('part one', () => {
    expect(gridOfLights.countTurnOnLight()).toBe(377891);
  });
  it('part two', () => {
    expect(gridOfBrightness.countTurnOnLight()).toBe(14110788);
  });
});
