import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TypePointsEnum } from './constants';

dayjs.extend(utc);

const DATE_FORMAT = 'MMM D';
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

function convertToUtc(stringDate) {
  return dayjs.utc(stringDate);
}

/**
 * Возвращает строку, представляющую дату в формате ДД.ММ.ГГ ЧЧ:мм,
 * или пустую строку, если дата недействительна.
 * @param {string} date - дата для форматирования в формате ISO 8601
 * @returns {string} строка с отформатированной датой
 */
function getFullDate(date) {
  if (!date || !date.length || !dayjs(date).isValid()) {
    return 'date undefined';
  }
  return dayjs.utc(date).format(FULL_DATE_FORMAT);
}

/**
 * Возвращает строку с заглавной первой буквой.
 * Если ввод не является строкой или пуст, возвращает пустую строку.
 * @param {string} word - строка для преобразования
 * @returns {string} преобразованная строка
 */
function getCapitalizedWord(word) {
  if (!word || typeof word !== 'string') {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}


/**
 * Возвращает случайный элемент из заданного массива.
 * Если входные данные не являются массивом или пусты, возвращает значение null.
 * @param {Array} elements - массив, из которого требуется получить случайный элемент.
 * @returns {?*} - случайный элемент из массива или значение null, если массив пуст или не является массивом
 */
function getRandomArrayElement(elements) {
  if (!Array.isArray(elements) || elements.length === 0) {
    return null;
  }

  return elements[Math.floor(Math.random() * elements.length)];
}


/**
 * Возвращает строку, представляющую дату в формате MMM D,
 * или пустую строку, если дата не валидна.
 * @param {string} rawDate - дата в формате ISO 8601
 * @returns {string} строка с отформатированной датой или пустую строку, если дата неверна
 */
function humanizePointDate(rawDate) {
  if (!dayjs(rawDate).isValid()) {
    return '';
  }

  if (typeof rawDate !== 'string') {
    return '';
  }

  const date = dayjs.utc(rawDate).format(DATE_FORMAT);

  return date;
}

/**
 * Возвращает строку, представляющую время в формате ЧЧ:мм,
 * или пустую строку, если время не валидно.
 * @param {string} rawDate - время в формате ISO 8601
 * @returns {string} строка с отформатированным временем или пустую строку, если время не валидно
 */
function humanizePointTime(rawDate) {
  if (!dayjs(rawDate).isValid()) {
    return '';
  }

  if (typeof rawDate !== 'string') {
    return '';
  }

  return dayjs.utc(rawDate).format(TIME_FORMAT);
}

function getSecondsDifference(start, end) {
  return end.diff(start, 'seconds');
}

function splitIntoComponents(totalSeconds) {
  const secondsInHour = SECONDS_IN_MINUTES * MINUTES_IN_HOUR;
  const secondsInDay = secondsInHour * HOURS_IN_DAY;

  const days = Math.floor(totalSeconds / secondsInDay);
  const remainderAfterDays = totalSeconds % secondsInDay;

  const hours = Math.floor(remainderAfterDays / secondsInHour);
  const remainderAfterHours = remainderAfterDays % secondsInHour;

  const minutes = Math.floor(remainderAfterHours / SECONDS_IN_MINUTES);
  const seconds = remainderAfterHours % SECONDS_IN_MINUTES;

  return { days, hours, minutes, seconds };
}

function formatOutput({ days, hours, minutes, seconds }) {
  let formattedDiffereceTime = '';

  if (days > 0) {
    formattedDiffereceTime += days < 10 ? `0${days}D ` : `${days}D `;
  }

  if (hours > 0 || formattedDiffereceTime.length > 0) {
    formattedDiffereceTime += hours < 10 ? `0${hours}H ` : `${hours}H `;
  }

  if (minutes > 0 || formattedDiffereceTime.length > 0) {
    formattedDiffereceTime += minutes < 10 ? `0${minutes}M ` : `${minutes}M `;
  }

  if (formattedDiffereceTime.length === 0) {
    formattedDiffereceTime += `${seconds}S`;
  }

  return formattedDiffereceTime.trim();
}

/**
 * Вычисляет разницу между двумя датами в секундах и форматирует ее в удобочитаемую строку.
 * Возвращает объект с двумя свойствами: "time" и "positive`.
 * `time` - это строка, представляющая разницу во времени в формате DDHHMMSS.
 * `positive" - это логическое значение, указывающее, является ли разница положительной (дата окончания находится после даты начала) или нет.
 * @param {string} start - дата начала в формате ISO 8601
 * @param {string} end - дата окончания в формате ISO 8601
 * @returns {object} объект сj свойствами `time` и `positive` свойствами
 */
function calculateTimeDifference(start, end) {
  const startDate = convertToUtc(start);
  const endDate = convertToUtc(end);
  const difference = getSecondsDifference(startDate, endDate);

  const positiveDifference = difference >= 0;

  const components = splitIntoComponents(difference);
  const formattedTime = formatOutput(components);

  return {
    time: formattedTime,
    positive: positiveDifference,
  };
}

function getIconSrcByType(type) {
  switch (type) {
    case TypePointsEnum.FLIGHT:
      return 'img/icons/flight.png';
    case TypePointsEnum.TRAIN:
      return 'img/icons/train.png';
    case TypePointsEnum.BUS:
      return 'img/icons/bus.png';
    case TypePointsEnum.SHIP:
      return 'img/icons/ship.png';
    case TypePointsEnum.CHECK:
      return 'img/icons/check-in.png';
    case TypePointsEnum.SIGHTSEEING:
      return 'img/icons/sightseeing.png';
    case TypePointsEnum.TAXI:
      return 'img/icons/taxi.png';
    case TypePointsEnum.DRIVE:
      return 'img/icons/drive.png';
    case TypePointsEnum.RESTAURANT:
      return 'img/icons/restaurant.png';
    default:
      return 'bus';
  }
}

function getTimeParams(start, end) {
  const timeStart = humanizePointTime(start);
  const timeEnd = humanizePointTime(end);

  const difference = calculateTimeDifference(start, end);
  return {
    timeStart,
    timeEnd,
    duration: difference.time,
    positiveDuration: difference.positive
  };
}

export {
  getRandomArrayElement,
  humanizePointDate,
  humanizePointTime,
  getIconSrcByType,
  calculateTimeDifference,
  getCapitalizedWord,
  getTimeParams,
  getFullDate
};
