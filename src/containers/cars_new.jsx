import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from 'redux-form';

// import action
import { addCar } from '../actions';

const required = value => value ? undefined : 'Required';
const carPlate = value => value && !/[A-Z0-9]/.test(value) ? 'Invalid plate license' : undefined;

class CarsNew extends Component {
  // callback when the form is submitted
  onSubmit = (values) => {
    // addCar take a second argument after values, which is a callback
    this.props.addCar(values, this.props.garage, (car) => {
      this.props.history.push('/'); // Navigate after submit, redirect to cars_index
      return car;
    });
  }

  capitalize = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
    <div className="form-group">
      <label>{label}</label>
        <input className="form-control" {...input} placeholder={label} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
    );
  }

  renderForm = () => {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          label="Brand"
          name="brand"
          type="text"
          component={this.renderField}
          validate={[required]}
        />
        <Field
          label="Model"
          name="model"
          type="text"
          component={this.renderField}
          validate={[required]}
        />
        <Field
          label="Owner"
          name="owner"
          type="text"
          component={this.renderField}
          validate={[required]}
        />
        <Field
          label="Plate"
          name="plate"
          type="text"
          component={this.renderField}
          validate={[required, carPlate]}
        />
        <button className="btn btn-primary" type="submit"
          disabled={this.props.invalid}>
          Add car
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="row d-flex">
        <aside className="col-12 col-lg-3">
          <h1>Garage {this.capitalize(this.props.garage)}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ut perspiciatis.</p>
          <Link to="/" className='btn btn-info'>
            Back to list
          </Link>
        </aside>
        <div className="col-12 col-lg-9 d-flex justify-content-center align-items-center">
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { addCar })(CarsNew)
);
