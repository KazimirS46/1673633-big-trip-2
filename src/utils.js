import dayjs from 'dayjs';
import { TypePointsEnum } from './constants';

const DATE_FORMAT = 'MMMM D';
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

function getFullDate(date) {
  return dayjs(date).format(FULL_DATE_FORMAT);
}

function getCapitalizedWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}
function getRandomArrayElement(elements) {
  return elements[Math.floor(Math.random() * elements.length)];
}

function humanizePointDate(rawDate) {
  const date = dayjs(rawDate).format(DATE_FORMAT);
  const day = date.slice(-2);
  const month = date.slice(0, 3);

  return `${month} ${day}`;
}

function humanizePointTime(rawDate) {
  return dayjs(rawDate).format(TIME_FORMAT);
}

function calculateTimeDifference(start, end) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const difference = endDate.diff(startDate, 'seconds');
  const positiveDifference = difference >= 0;

  const secondsInHour = SECONDS_IN_MINUTES * MINUTES_IN_HOUR;
  const secondsInDay = secondsInHour * HOURS_IN_DAY;

  const days = Math.floor(difference / secondsInDay);
  const remainderAfterDays = difference % secondsInDay;

  const hours = Math.floor(remainderAfterDays / secondsInHour);
  const remainderAfterHours = remainderAfterDays % secondsInHour;

  const minutes = Math.floor(remainderAfterHours / SECONDS_IN_MINUTES);
  const seconds = remainderAfterHours % SECONDS_IN_MINUTES;

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

  return {
    time: formattedDiffereceTime,
    positive: positiveDifference
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
