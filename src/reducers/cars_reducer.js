import { FETCH_CARS, CAR_CREATED, FETCH_CAR, DELETE_CAR } from "../actions";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CARS:
      return action.payload;
    case FETCH_CAR:
      return [action.payload];
    case DELETE_CAR:
      return [action.payload];
    default:
      return state;
  }
}
