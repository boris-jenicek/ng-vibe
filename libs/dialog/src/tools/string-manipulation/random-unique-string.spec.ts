import { generateRandomString } from './random-unique-string';

describe('generateRandomString', () => {
  it('should generate a unique string each time', () => {
    const string1 = generateRandomString();
    const string2 = generateRandomString();
    expect(string1).not.toEqual(string2);
  });
});
