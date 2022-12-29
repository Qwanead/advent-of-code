const INITIAL_FLOOR = 0;

class SantaFloorRoute {
  protected steps;

  protected StepChar = {
    ['(']: 1,
    [')']: -1,
  } as const;

  constructor(input: string) {
    const stepChars = Object.keys(this.StepChar);
    this.steps = [...input]
      .filter((char) => stepChars
        .includes(char)) as (keyof typeof this.StepChar)[];
  }

  getTargetFloor() {
    return this.steps
      .reduce((acc, item) => acc + this.StepChar[item], INITIAL_FLOOR);
  }

  findStep(floorNum: number = -1) {
    let currentFloor = INITIAL_FLOOR;
    for (let i = 0; i < this.steps.length; i += 1) {
      currentFloor += this.StepChar[this.steps[i]];
      if (currentFloor === floorNum) {
        return i + 1;
      }
    }

    return null;
  }
}

export default SantaFloorRoute;
