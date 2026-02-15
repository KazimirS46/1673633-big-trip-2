import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: '01',
    basePrice: 1100,
    dateFrom: '2019-07-10T11:55:56.845Z',
    dateTo: '2019-07-10T22:22:13.375Z',
    destination: 'Chamonix',
    isFavorite: false,
    offers: ['1', '2'],
    type: 'bus'
  },
  {
    id: '02',
    basePrice: 1500,
    dateFrom: '2020-08-15T10:30:00.000Z',
    dateTo: '2020-08-15T14:45:00.000Z',
    destination: 'Venice',
    isFavorite: true,
    offers: [],
    type: 'check-in'
  },
  {
    id: '03',
    basePrice: 2000,
    dateFrom: '2021-09-20T15:15:00.000Z',
    dateTo: '2021-09-20T18:30:00.000Z',
    destination: 'Amsterdam',
    isFavorite: false,
    offers: ['2'],
    type: 'drive'
  },
  {
    id: '04',
    basePrice: 1800,
    dateFrom: '2022-10-25T18:45:00.000Z',
    dateTo: '2022-10-25T22:00:00.000Z',
    destination: 'Geneva',
    isFavorite: true,
    offers: ['1'],
    type: 'flight'
  },
  {
    id: '05',
    basePrice: 2500,
    dateFrom: '2023-11-30T00:00:00.000Z',
    dateTo: '2023-11-30T21:30:00.000Z',
    destination: 'Berlin',
    isFavorite: false,
    offers: ['3', '4', '5'],
    type: 'restaurant'
  },
  {
    id: '06',
    basePrice: 3000,
    dateFrom: '2024-12-05T09:30:00.000Z',
    dateTo: '2024-12-05T13:00:00.000Z',
    destination: 'Barcelona',
    isFavorite: true,
    offers: ['7', '8'],
    type: 'ship'
  },
  {
    id: '07',
    basePrice: 2200,
    dateFrom: '2025-01-10T12:15:00.000Z',
    dateTo: '2025-01-10T16:30:00.000Z',
    destination: 'Paris',
    isFavorite: false,
    offers: ['6'],
    type: 'sightseeing'
  },
  {
    id: '08',
    basePrice: 1900,
    dateFrom: '2025-02-15T14:00:00.000Z',
    dateTo: '2025-02-16T17:30:00.000Z',
    destination: 'Rome',
    isFavorite: true,
    offers: ['1', '5'],
    type: 'taxi'
  },
  {
    id: '09',
    basePrice: 2800,
    dateFrom: '2025-03-20T19:45:00.000Z',
    dateTo: '2025-03-21T23:15:00.000Z',
    destination: 'London',
    isFavorite: false,
    offers: ['3'],
    type: 'train'
  }
];

function getRandomPoints() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoints };
