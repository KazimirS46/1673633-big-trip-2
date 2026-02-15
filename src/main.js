import HeaderInfoView from './view/header-info-view.js';
import NewPointButtonView from './view/new-event-button-add-view.js';
import FiltersView from './view/filters-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './models/points-model.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const headerMainContainer = siteHeaderElement.querySelector('.trip-main');
const headerFiltersContainer = headerMainContainer.querySelector('.trip-controls__filters');
const pointsMainContainer = siteMainElement.querySelector('.page-body__container');
const pointsModel = new PointsModel();

const pointsPresenter = new PointsPresenter({
  pointsContainer: pointsMainContainer,
  pointsModel,
});

render(new HeaderInfoView(), headerMainContainer, 'afterbegin');
render(new FiltersView(), headerFiltersContainer, 'beforeend');
render(new NewPointButtonView(), headerMainContainer, 'beforeend');

pointsPresenter.init();
