import { getRandomInt, shuffle } from "../utility";


test('random character func ensure not undefined', () => {
  const randomCharacter = shuffle("abcdefg");
  expect(randomCharacter).toBeDefined();
});

test('random character func ensure return same length words', () => {
  const mockWord = "abcdefg";
  const randomCharacter = shuffle(mockWord);
  expect(randomCharacter).toHaveLength(mockWord.length);
});
