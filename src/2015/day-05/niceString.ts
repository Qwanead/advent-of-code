export const hasThreeVowels = (str: string) => {
  const vowels = [...'aeiou'];
  const vowelsCount = [...str]
    .reduce((acc, cur) => (vowels.includes(cur) ? acc + 1 : acc), 0);

  return vowelsCount >= 3;
};

export const hasDoubleLetter = (str: string) => {
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === str[i + 1]) {
      return true;
    }
  }
  return false;
};

export const containDisallowedStr = (str: string) => {
  const disallowedStrs = ['ab', 'cd', 'pq', 'xy'];
  return disallowedStrs.some((disallowedStr) => str.includes(disallowedStr));
};


export const isNiceStr = (str: string) => hasThreeVowels(str)
  && hasDoubleLetter(str)
  && !containDisallowedStr(str);

export const getNiceStrCount = (str: string, handler = isNiceStr) => {
  const strs = str.split('\n');

  return strs.reduce((acc, cur) => (handler(cur) ? acc + 1 : acc), 0);
};

export const hasDoublePair = (str: string) => {
  const letters = [...str];
  for (let i = 1; i < letters.length; i += 1) {
    const pair = `${letters[i - 1]}${letters[i]}`;
    for (let j = i + 1; j + 1 < letters.length; j += 1) {
      const checkedPair = `${letters[j]}${letters[j + 1]}`;
      if (pair === checkedPair) {
        return true;
      }
    }
  }
  return false;
};

export const hasRepeatsLetter = (str: string) => {
  const letters = [...str];
  for (let i = 0; i + 2 < letters.length; i += 1) {
    if (letters[i] === letters[i + 2]) {
      return true;
    }
  }
  return false;
};

export const isNiceStrVersionTwo = (str: string) => hasDoublePair(str)
  && hasRepeatsLetter(str);

