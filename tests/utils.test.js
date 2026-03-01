import { expect, describe, it } from '@jest/globals';
import {
  getFullDate,
  getCapitalizedWord,
  getRandomArrayElement,
  humanizePointDate
} from '../src/utils';

describe('should convert ISO to custom format', () => {
  it('when valid ISO date is provided, returns data in format DD/MM/YY HH:mm', () => {
    const inputDate = '2023-10-18T14:30:00Z';
    const expectedOutput = '18/10/23 14:30';

    expect(getFullDate(inputDate)).toBe(expectedOutput);
  });

  it('when different month and year values are passed, handles them correctly', () => {
    const datesToTest = [
      { date: '2023-01-01T00:00:00Z', expected: '01/01/23 00:00' },
      { date: '2023-12-31T23:59:59Z', expected: '31/12/23 23:59' },
      { date: '2024-06-15T12:30:00Z', expected: '15/06/24 12:30' },
    ];

    for (const { date, expected } of datesToTest) {
      expect(getFullDate(date)).toBe(expected);
    }
  });

  it('when invalid or non-date value is passed, returns \'date undefined\'', () => {
    const invalidInputs = [undefined, NaN, '', {}, [], true, 1234567890, 'invalid-date'];

    for (const input of invalidInputs) {
      expect(getFullDate(input)).toBe('date undefined');
    }
  });
});

describe('should capitalize first letter', () => {
  it('when single word is passed, properly capitalizes first character', () => {
    expect(getCapitalizedWord('hello')).toBe('Hello');
  });

  it('when multiple characters are present, leaves other letters unchanged', () => {
    expect(getCapitalizedWord('world')).toBe('World');
  });

  it('when empty string is passed, returns empty string', () => {
    expect(getCapitalizedWord('')).toBe('');
  });

  it('when one-character string is passed, converts it to uppercase', () => {
    expect(getCapitalizedWord('a')).toBe('A');
  });

  it('when numbers or special symbols are included, does not change them', () => {
    expect(getCapitalizedWord('123abc')).toBe('123abc');
    expect(getCapitalizedWord('@test')).toBe('@test');
  });

  it('when the data is invalid, returns the empty string', () => {
    const invalidInputs = [undefined, NaN, {}, [], true, 1234567890];

    for (const input of invalidInputs) {
      expect(getCapitalizedWord(input)).toBe('');
    }
  });
});

describe('should return a random array element or null', () => {
  it('when the array is not empty and valid', () => {
    const array = ['apple', 'banana', 'cherry'];
    const result = getRandomArrayElement(array);

    expect(array.includes(result)).toBe(true);
  });

  it('when the array is empty', () => {
    const array = [];
    const result = getRandomArrayElement(array);

    expect(result).toBe(null);
  });

  it('when not an array', () => {
    const array = 'not an array';
    const result = getRandomArrayElement(array);

    expect(result).toBeNull();
  });
});

describe('should return a string representing the date in MMM D format or an empty string if the date is not valid.', () => {
  it('when the data is in ISO 8601 format', () => {
    expect(humanizePointDate('2023-08-15T12:34:56Z')).toBe('Aug 15');
    expect(humanizePointDate('2025-01-01')).toBe('Jan 1');
    expect(humanizePointDate('2024-12-31T23:59:59Z')).toBe('Dec 31');
  });

  it('when the value is invalid, returns the empty string', () => {
    const invalidValues = ['invalid-date', undefined, NaN, 1234567890];

    for (const input of invalidValues) {
      expect(humanizePointDate(input)).toBe('');
    }
  });
});

