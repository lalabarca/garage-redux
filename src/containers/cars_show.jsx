import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import action
import { fetchCar, deleteCar } from '../actions';

class CarsShow extends Component {
  componentDidMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  capitalize = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  }

  handleClick = () => {
    this.props.deleteCar(this.props.match.params.id, (car) => {
      this.props.history.push('/'); // Navigate after submit, redirect to cars_index
      return car;
    });
  }

  render() {
    if (!this.props.car) {
      return <p>Loading...</p>;
    }
    return (
      <div className="row d-flex">
        <aside className="col-12 col-lg-3">
          <h1>Garage {this.capitalize(this.props.garage)}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ut perspiciatis.</p>
          <Link to="/" className='btn btn-info'>
            Back to list
          </Link>
        </aside>
        <div className="col-12 col-lg-9">
          <div className="card-product">
            <img src="https://source.unsplash.com/mU6oD7asnyM/640x428" alt="picture of the car" />
            <div className="card-product-infos">
              <h2>{this.props.car.brand} - {this.props.car.model}</h2>
              <p><strong>Owner: </strong>{this.props.car.owner}</p>
              <span className="plate-license">{this.props.car.plate}</span>
            </div>
            <button className="btn btn-danger delete-btn" onClick={this.handleClick}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

function mapStateToProps(state, ownProps) {
  // i get the url from the route with the component props and convert it in an integer
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  // among all the cars from the redux state i search if the id for each
  // car is equal to the idfromurl that i have
  const car = state.cars.find(c => c.id === idFromUrl);
  return {
    car,
    garage: state.garage
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);
