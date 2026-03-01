import { getRandomPoints } from '../mock/points';
import mockOffers from '../mock/offers';
import mockDestinations from '../mock/destinations';

const POINTS_COUNT = 5;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoints);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type);
  }

  getOffersById(id) {
    const offersByType = this.points ? this.getOffersByType(this.points[id].type) : [];
    const offerIdsByPointId = this.points ? this.points[id].offers : [];
    const offersById = offersByType.offers.filter((offer) => offerIdsByPointId.includes(offer.id));
    return {
      offersByType: offersByType.offers || [],
      offersById
    };
  }

  getDestinationById(id) {
    const destinationId = this.points[id].destination;
    const destination = this.destinations.find((destinationItem) => destinationItem.id === destinationId);
    return destination;
  }

  getPriceWithOffers(id) {
    const offersById = this.getOffersById(id);
    const price = offersById.offersById.reduce((acc, offer) => acc + offer.price, this.points[id].basePrice) || this.points[id].basePrice;

    return price;
  }
}
