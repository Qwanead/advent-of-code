export type BoxDimensions = [number, number, number];
type GetBoxParam = (arr: BoxDimensions) => number;

export const getBoxSquare = ([l, w, h]: BoxDimensions) => {
  const sideSquares = [l * w, w * h, h * l];
  const [lessSquare] = sideSquares.sort((a, b) => a - b);

  return 2 * sideSquares.reduce((acc, cur) => acc + cur, 0) + lessSquare;
};

export const getRibbonLength = ([l, w, h]: BoxDimensions) => {
  const boxVolume = l * w * h;
  const [lessSideA, lessSideB] = [l, w, h].sort((a, b) => a - b);
  const lessPerimeter = 2 * (lessSideA + lessSideB);

  return lessPerimeter + boxVolume;
};

class GiftBoxes {
  protected boxSizes: BoxDimensions[];

  constructor(input: string) {
    this.boxSizes = input.split('\n')
      .map((box) => (box.split('x'))
        .map((it) => Number(it))) as BoxDimensions[];
  }

  private reduceGiftBoxes(getBoxParam: GetBoxParam) {
    return this.boxSizes
      .reduce((acc, dimensions) => acc + getBoxParam(dimensions), 0);
  }

  public getBoxSquareSum() {
    return this.reduceGiftBoxes(getBoxSquare);
  }

  public getRibbonLengthSum() {
    return this.reduceGiftBoxes(getRibbonLength);
  }
}

export default GiftBoxes;
