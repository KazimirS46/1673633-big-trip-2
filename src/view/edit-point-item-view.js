import { createElement } from '../render';
import {
  getCapitalizedWord,
  getIconSrcByType,
  getFullDate
} from '../utils';
import { TYPE_POINTS } from '../constants';

function createTypeTemplate(type, pointType, id) {
  const label = getCapitalizedWord(type);

  return (`
    <div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type} ${type === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${label}</label>
    </div>
  `);
}

function createOptionTemplate(name) {
  return `<option value="${name}"></option>`;
}

function createOfferSelectTemplate(offer, pointId, currentOffers) {
  const isChecked = currentOffers.some((currentOffer) => currentOffer.id === offer.id);

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-${pointId}" type="checkbox" name="event-offer-${offer.id}" ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-${pointId}}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `);
}

function createPhotoTemplate(picture) {
  return `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`;
}

function createEditEventItemTemplate(point, currentOffers, destinations, price) {
  const pointType = getCapitalizedWord(point.type);
  const icon = getIconSrcByType(point.type);
  const currentDestination = destinations.find((destination) => destination.id === point.destination);

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src=${icon} alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${TYPE_POINTS.map((typePoint) => createTypeTemplate(typePoint, point.type, point.id)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${point.id}">
              ${pointType}
            </label>
            <input class="event__input event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value=${currentDestination.name} list="destination-list-${point.id}">
            <datalist id="destination-list-${point.id}">
              ${destinations.map((destination) => createOptionTemplate(destination.name)).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(point.dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(point.dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${currentOffers.offersByType.length ? (`
            <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${currentOffers.offersByType.map((offer) => createOfferSelectTemplate(offer, point.id, currentOffers.offersById)).join('')}
            </div>
          </section>
          `) : ''}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>

            ${currentDestination.pictures?.length ? (`
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${currentDestination.pictures.map((picture) => createPhotoTemplate(picture)).join('')}
                </div>
              </div>
            `) : ''}
          </section>
        </section>
      </form>
    </li>
  `);
}

export default class EditEventItemView {
  constructor({point, currentOffers, destinations, price}) {
    this.point = point;
    this.destinations = destinations;
    this.currentOffers = currentOffers;
    this.price = price;
  }

  getTemplate() {
    return createEditEventItemTemplate(
      this.point,
      this.currentOffers,
      this.destinations,
      this.price
    );
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
