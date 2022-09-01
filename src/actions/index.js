// TODO: add and export your own actions
export const FETCH_CARS = "FETCH_CARS";
export const CAR_CREATED = "CAR_CREATED";
export const FETCH_CAR = "FETCH_CAR";
export const DELETE_CAR = "DELETE_CAR"

export function fetchCars(garage) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`).then(r => r.json());

  return {
    type: FETCH_CARS,
    payload: promise
  };
}

export function addCar(body, garage, callback) {
  const request = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json()).then(callback);

  return {
    type: CAR_CREATED,
    payload: request
  };
}

export function fetchCar(id) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`)
    .then(response => response.json());
  return {
    type: FETCH_CAR,
    payload: promise
  };
}

export function deleteCar(id, callback) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`, {
    method: 'DELETE'
  }).then(response => response.json()).then(callback);
  return {
    type: FETCH_CAR,
    payload: promise
  };
}
