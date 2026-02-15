import { getRandomArrayElement } from '../utils';

const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    destinations: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  }
];

function getRandomDestinations() {
  return getRandomArrayElement(mockDestinations);
}

export { getRandomDestinations };
