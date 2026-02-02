import EventsView from '../view/events-view.js';
import EventsSortView from '../view/events-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EditEventItemView from '../view/edit-event-item-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  eventComponent = new EventsView();
  eventListComponent = new EventListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.eventComponent, this.eventsContainer);
    render(new EventsSortView(), this.eventComponent.getElement(), 'beforeend');
    render(this.eventListComponent, this.eventComponent.getElement(), 'beforeend');
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        render(new EditEventItemView(), this.eventListComponent.getElement(), 'beforeend');
      } else {
        render(new EventItemView(), this.eventListComponent.getElement(), 'beforeend');
      }
    }
  }
}
