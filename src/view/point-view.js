import { createElement } from '../render';

function createEventsTemplate() {
  return (`
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>
  `);
}

export default class EventsView {
  getTemplate() {
    return createEventsTemplate();
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
