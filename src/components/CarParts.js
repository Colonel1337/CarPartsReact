import React from 'react';
import CarPartsForm from './CarPartForm';
import UUID from 'uuid';
import '../css/CarParts.css';

const carParts = [];
const apiUrl = 'http://localhost:55899/api/CarParts';

class CarPartsDataRow extends React.Component {
  render() { 
    return (
  	  <tr>
        <td><a href="#!" onClick={this.props.editCarPart}>{this.props.Id}</a></td>
        <td>{this.props.PartNumber}</td>
        <td>{this.props.PartName}</td>
        <td>{this.props.Description}</td>
        <td>{this.props.CarManufacturerName}</td>
        <td><a href="#!" onClick={this.props.deleteCarPart}>Delete</a></td>
      </tr>
    );
  }
};

export default class CarParts extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		carParts: carParts,
      carPart: getNewCarPart(),
      showTable: true,
      showForm: false,    
  	}
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.saveCarPart = this.saveCarPart.bind(this);
    this.deleteCarPart = this.deleteCarPart.bind(this);
    this.editCarPart = this.editCarPart.bind(this);
  }

  componentDidMount() {
    fetch(apiUrl)
    .then(results =>{
      return results.json();
    }).then(json =>{
      this.setState({carParts: json})
    })
  }

  handleCancelClick() {
    this.setState({showTable: true});
    this.setState({showForm: false});
  }

  saveCarPart(carPart) {
    addOrUpdateCarPart(carPart);
    var tempCarParts = this.state.carParts;
    var index = tempCarParts.indexOf(carPart);
    if (index === -1){
      tempCarParts.push(carPart);
      this.setState({carParts: tempCarParts});
    }
    this.setState({showTable: true});
    this.setState({showForm: false});
  }

  editCarPart(carPart) {
    this.setState({carPart: carPart})
    this.setState({showTable: false});
    this.setState({showForm: true});
  }

  deleteCarPart(carPart) {
    deleteCarPartById(carPart.Id);
    var tempCarParts = this.state.carParts;
    var index = tempCarParts.indexOf(carPart);
    if (index !== -1){
      tempCarParts.splice(index, 1);
      this.setState({carParts: tempCarParts});
    }
  }

  handleAddClick(event) {
    this.setState({carPart: getNewCarPart()});
    this.setState({showTable: false});
    this.setState({showForm: true});
  }

  render() {
  	var rows = [];
  	this.state.carParts.forEach(function(carPart){
  		rows.push(<CarPartsDataRow key={carPart.Id} Id={carPart.Id} PartNumber={carPart.PartNumber} PartName={carPart.PartName} Description={carPart.Description} CarManufacturerName={carPart.CarManufacturerName} deleteCarPart={() => this.deleteCarPart(carPart)} editCarPart={() => this.editCarPart(carPart)} />);
  	}.bind(this));
  	if (this.state.carParts.length === 0) {
  		rows.push(<tr key="empty"><td colSpan="6">No available car parts.</td></tr>);
  	}
    return (
    <React.Fragment>
        {this.state.showTable && 
        <div>
        <fieldset>
        <legend>Car Parts</legend>   
        <div className="div-control-organizer">
          <div>
            <a href="#!" className="myButton" onClick={this.handleAddClick}>Add</a>
          </div>
          <div>
            <table className="blueTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Part #</th>
                  <th>Part Name</th>
                  <th>Description</th>
                  <th>Car Manufacturer Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </fieldset>
      </div>
      }
      {this.state.showForm && 
        <div>
          <CarPartsForm carPart={this.state.carPart} handleCancelClick={this.handleCancelClick} saveCarPart={() => this.saveCarPart(this.state.carPart)} />
        </div>
      }
    </React.Fragment>
	);
  }
}

function getNewCarPart() {
  var carPart = {
    Id: UUID.v4(),
    PartName: '',
    PartNumber: '',
    Description: '',
    CarManufacturerName: ''
  }
  return carPart;
}

function addOrUpdateCarPart(carPart){
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(carPart),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(err =>{
    console.log(err);
  })
}

function deleteCarPartById(id){
  fetch(apiUrl + "/" + id, {
    method: 'DELETE'
  }).catch(err =>{
    console.log(err);
  })
}