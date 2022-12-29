import getPostfix from './getPostfix';
import md5 from 'md5';

describe('getPostfix', () => {
  const testCases: [string, number][] = [
    ['abcdef', 609043],
    ['pqrstuv', 1048970],
    ['ckczppom', 117946],
  ];

  testCases.forEach(([input, result]) => {
    const target = `${input}${result}`;
    it(`${target} => correct`, () => {
      expect(md5(target).startsWith('00000')).toBe(true);
    });
  });


  testCases.forEach(([input, result]) => {
    it(`${input} => ${result}`, () => {
      expect(getPostfix(input)).toStrictEqual(result);
    });
  });

  it('ckczppom => 3938038', () => {
    expect(getPostfix('ckczppom', '000000')).toStrictEqual(3938038);
  });
});
