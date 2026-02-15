import { getRandomPoints } from '../mock/points';
import mockOffers from '../mock/offers';

const POINTS_COUNT = 5;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoints);
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }
}
