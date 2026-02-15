import dayjs from 'dayjs';
import { TypePoints } from './constants';

const DATE_FORMAT = 'MMMM D';
const TIME_FORMAT = 'HH:mm';
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

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
    case TypePoints.FLIGHT:
      return 'img/icons/flight.png';
    case TypePoints.TRAIN:
      return 'img/icons/train.png';
    case TypePoints.BUS:
      return 'img/icons/bus.png';
    case TypePoints.SHIP:
      return 'img/icons/ship.png';
    case TypePoints.CHECK:
      return 'img/icons/check-in.png';
    case TypePoints.SIGHTSEEING:
      return 'img/icons/sightseeing.png';
    case TypePoints.TAXI:
      return 'img/icons/taxi.png';
    case TypePoints.DRIVE:
      return 'img/icons/drive.png';
    case TypePoints.RESTAURANT:
      return 'img/icons/restaurant.png';
    default:
      return 'bus';
  }
}

function getOffersByType(type, offers) {
  return offers.find((offer) => offer.type === type);
}

export {
  getRandomArrayElement,
  humanizePointDate,
  humanizePointTime,
  getIconSrcByType,
  calculateTimeDifference,
  getCapitalizedWord,
  getOffersByType
};
