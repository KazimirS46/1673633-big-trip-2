import HeaderInfoView from './view/header-info-view.js';
import NewEventButtonView from './view/new-event-button-add-view.js';
import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const headerMainContainer = siteHeaderElement.querySelector('.trip-main');
const headerFiltersContainer = headerMainContainer.querySelector('.trip-controls__filters');
const eventsMainContainer = siteMainElement.querySelector('.page-body__container');

const eventsPresenter = new EventsPresenter({eventsContainer: eventsMainContainer});

render(new HeaderInfoView(), headerMainContainer, 'afterbegin');
render(new FiltersView(), headerFiltersContainer, 'beforeend');
render(new NewEventButtonView(), headerMainContainer, 'beforeend');

eventsPresenter.init();
