import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import action
import { fetchCars } from "../actions";

class CarsIndex extends Component {
  componentWillMount() {
    this.props.fetchCars(this.props.garage);
  }

  capitalize = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  }

  renderCars = () => {
    if (!this.props.cars.length) {
      return <h4>There are no cars yet. You have to add one.</h4>;
    }
    return this.props.cars.map((car) => {
      return (
        <Link to={`/cars/${car.id}`} key={car.id}>
          <div className="card-product">
            <img src="https://source.unsplash.com/mU6oD7asnyM/640x428" alt="picture of the car"/>
            <div className="card-product-infos">
              <h2>{car.brand} - {car.model}</h2>
              <p><strong>Owner: </strong>{car.owner}</p>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <aside className="col-12 col-lg-3">
          <h1>Garage {this.capitalize(this.props.garage)}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ut perspiciatis.</p>
          <Link to="/cars/new" className='btn btn-info'>
            Add a car
          </Link>
        </aside>
        <div className="col-12 col-lg-9">
          {this.renderCars()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

function mapStateToProps(state) {
  return {
    cars: state.cars,
    garage: state.garage
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
