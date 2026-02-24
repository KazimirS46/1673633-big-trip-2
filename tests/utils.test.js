import { test, expect, describe } from '@jest/globals';
import { getFullDate, getCapitalizedWord } from '../src/utils';

describe('getFullDate function', () => {
  test('Возвращает данные в формате DD/MM/YY HH:mm', () => {
    const inputDate = '2023-10-18T14:30:00Z';
    const expectedOutput = '18/10/23 14:30';

    expect(getFullDate(inputDate)).toEqual(expectedOutput);
  });

  test('Корректно обрабатывает крайние случаи с разными месяцами и годами', () => {
    const datesToTest = [
      { date: '2023-01-01T00:00:00Z', expected: '01/01/23 00:00' },
      { date: '2023-12-31T23:59:59Z', expected: '31/12/23 23:59' },
      { date: '2024-06-15T12:30:00Z', expected: '15/06/24 12:30' },
    ];

    for (const { date, expected } of datesToTest) {
      expect(getFullDate(date)).toEqual(expected);
    }
  });

  test('Возвращает пустую строку при указании неверной даты', () => {
    const invalidInputs = [undefined, NaN, '', {}, [], true, 1234567890, 'invalid-date'];

    for (const input of invalidInputs) {
      expect(getFullDate(input)).toEqual('date undefined');
    }
  });
});

describe('getCapitalizedWord function', () => {
  test('правильно капитализирует первый символ', () => {
    expect(getCapitalizedWord('hello')).toBe('Hello');
  });

  test('не меняет остальные символы строки', () => {
    expect(getCapitalizedWord('world')).toBe('World');
  });

  test('обрабатывает пустую строку', () => {
    expect(getCapitalizedWord('')).toBe('');
  });

  test('корректно обрабатывает строку длиной в один символ', () => {
    expect(getCapitalizedWord('a')).toBe('A');
  });

  test('работает с цифрами и специальными символами', () => {
    expect(getCapitalizedWord('123abc')).toBe('123abc');
    expect(getCapitalizedWord('@test')).toBe('@test');
  });

  test('Возвращает пустую строку при указании неверной даты', () => {
    const invalidInputs = [undefined, NaN, {}, [], true, 1234567890];

    for (const input of invalidInputs) {
      expect(getCapitalizedWord(input)).toBe('');
    }
  });
});
