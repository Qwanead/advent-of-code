import md5 from 'md5';
const LIMIT = 50000000;

const getPostfix = (input: string, hashPrefix = '00000') => {
  for (let i = 1; i <= LIMIT; i += 1) {
    if (md5(`${input}${i}`).startsWith(hashPrefix)) {
      return i;
    }
  }

  throw Error('Can\'t compute in reasonable time');
};

export default getPostfix;
