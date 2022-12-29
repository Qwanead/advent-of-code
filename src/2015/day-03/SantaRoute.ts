export type Cord = [number, number];
const Direction = {
  NORTH: '^',
  SOUTH: 'v',
  EAST: '>',
  WEST: '<',
} as const;
type DirectionChar = typeof Direction[keyof typeof Direction];

const isCordsEqual = ([xA, yA]: Cord, [xB, yB]: Cord) => xA === xB && yA === yB;

class SantaRoute {
  public uniqueRoutePoints: Cord[] = [[0, 0]];

  protected currentCord: Cord = [0, 0];

  constructor(input: string) {
    const steps = [...input] as DirectionChar[];
    steps.forEach((step) => {
      let [x, y] = this.currentCord;
      switch (step) {
        case Direction.NORTH:
          y += 1;
          break;
        case Direction.SOUTH:
          y -= 1;
          break;
        case Direction.EAST:
          x += 1;
          break;
        case Direction.WEST:
          x -= 1;
          break;
      }

      this.currentCord = [x, y];
      const isPointViseted = this.uniqueRoutePoints
        .some((point) => isCordsEqual(point, this.currentCord));
      if (!isPointViseted) {
        this.uniqueRoutePoints.push(this.currentCord);
      }
    });
  }

  public getUniquePointCount() {
    return this.uniqueRoutePoints.length;
  }
}

export const getUniquePointCountForTwoSanta = (input: string) => {
  const steps = [...input] as DirectionChar[];
  const santaSteps = steps.filter((_, i) => i % 2 !== 0);
  const roboSantaSteps = steps.filter((_, i) => i % 2 === 0);

  const {
    uniqueRoutePoints: santaPoints,
  } = new SantaRoute(santaSteps.join(''));
  const {
    uniqueRoutePoints: roboSantaPoints,
  } = new SantaRoute(roboSantaSteps.join(''));
  const filtredSantaPoints = santaPoints
    .filter((santaPoint) => !roboSantaPoints
      .some((roboSantaPoint) => isCordsEqual(santaPoint, roboSantaPoint)));

  return [...filtredSantaPoints, ...roboSantaPoints].length;
};

export default SantaRoute;
