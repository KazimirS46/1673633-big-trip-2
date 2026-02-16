const TypePointsEnum = {
  BUS: 'bus',
  TAXI: 'taxi',
  TRAIN: 'train',
  SHIP: 'ship',
  CHECK: 'check-in',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  RESTAURANT: 'restaurant',
  SIGHTSEEING: 'sightseeing',
};

const TYPE_POINTS = [
  TypePointsEnum.FLIGHT,
  TypePointsEnum.TRAIN,
  TypePointsEnum.BUS,
  TypePointsEnum.SHIP,
  TypePointsEnum.CHECK,
  TypePointsEnum.SIGHTSEEING,
  TypePointsEnum.TAXI,
  TypePointsEnum.DRIVE,
  TypePointsEnum.RESTAURANT,
];

export {TypePointsEnum, TYPE_POINTS};
