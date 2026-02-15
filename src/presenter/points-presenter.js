import PointView from '../view/point-view.js';
import PointSortView from '../view/point-sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import EditPointItemView from '../view/edit-point-item-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  pointComponent = new PointView();
  pointsListComponent = new PointListView();

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.pointsList = [...this.pointsModel.getPoints()];

    render(this.pointComponent, this.pointsContainer);
    render(new PointSortView(), this.pointComponent.getElement(), 'beforeend');
    render(this.pointsListComponent, this.pointComponent.getElement(), 'beforeend');

    for (let i = 0; i < this.pointsList.length; i++) {
      if (i === 0) {
        render(new EditPointItemView(), this.pointsListComponent.getElement(), 'beforeend');
      } else {
        render(new PointItemView({point: this.pointsList[i], offers: this.pointsModel.offers}), this.pointsListComponent.getElement(), 'beforeend');
      }
    }
  }
}
