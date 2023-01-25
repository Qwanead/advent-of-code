export enum Action { Off, On, Toggle }
export enum LightStatus { Off, On }
type Cord = [number, number];
export type Command = [Action, Cord, Cord];
export type Grid = LightStatus[][];

const ActionDict = {
  'turn off': Action.Off,
  'turn on': Action.On,
  'toggle': Action.Toggle,
} as const;

export const parse = (str: string): Command => {
  const starterWords = Object.keys(ActionDict) as (keyof typeof ActionDict)[];
  const starterWord = starterWords.find((it) => str.startsWith(it));
  if (!starterWord) {
    throw Error(`Uncorrect string ${str}`);
  }
  const action = ActionDict[starterWord];
  const truncatedString = str.slice(starterWord.length + 1);
  const cords = truncatedString
    .split(' through ')
    .map((it) => it.split(',').map(Number)) as [Cord, Cord];

  return [action, ...cords];
};

export const createGrid = (width: number, height: number): Grid => {
  const result: Grid = [];
  for (let i = 0; i < height; i += 1) {
    result.push(new Array(width).fill(LightStatus.Off));
  }
  return result;
};

export const countLight = (grid: Grid) => grid
  .reduce((acc, curr) =>
    acc + curr.reduce((accum, light) => accum += light, 0), 0);

const setLightStatus = (action: Action, num: number) => {
  switch (action) {
    case Action.Off:
      return LightStatus.Off;
    case Action.On:
      return LightStatus.On;
    case Action.Toggle:
      return num === LightStatus.Off ? LightStatus.On : LightStatus.Off;
  }
};

const setBrightness = (action: Action, num: number) => {
  switch (action) {
    case Action.Off:
      return num - 1 >= 0 ? num - 1 : 0;
    case Action.On:
      return num + 1;
    case Action.Toggle:
      return num + 2;
  }
};

const setGrid = (
  comandStr: string,
  _grid: Grid,
  lightHandler: (action: Action, num: number) => number,
) => {
  const grid = JSON.parse(JSON.stringify(_grid)) as Grid;
  const command = parse(comandStr);
  const [action, startCord, endCord] = command;
  const [x1, y1] = startCord;
  const [x2, y2] = endCord;

  for (let x = x1; x <= x2; x += 1) {
    for (let y = y1; y <= y2; y += 1) {
      grid[x][y] = lightHandler(action, grid[x][y]);
    }
  }

  return grid;
};

class GridOfLights {
  protected grid;

  protected lightHandler;

  constructor(width: number, height: number) {
    this.grid = createGrid(width, height);
    this.lightHandler = setLightStatus;
  }

  public do(comandStr: string) {
    this.grid = setGrid(comandStr, this.grid, this.lightHandler);
  }

  public countTurnOnLight() {
    return countLight(this.grid);
  }
}

export class GridOfBrightness extends GridOfLights {
  constructor(width: number, height: number) {
    super(width, height);
    this.lightHandler = setBrightness;
  }
}

export default GridOfLights;
