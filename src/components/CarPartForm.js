import React from 'react';
import '../css/CarParts.css';

export default class CarPartForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Id: this.props.carPart.Id,
      PartNumber: this.props.carPart.PartNumber,
      PartName: this.props.carPart.PartName,
      Description: this.props.carPart.Description,
      CarManufacturerName: this.props.carPart.CarManufacturerName
    }
    this.handlePartNumberChange = this.handlePartNumberChange.bind(this);
    this.handlePartNameChange = this.handlePartNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCarManufacturerNameChange = this.handleCarManufacturerNameChange.bind(this);
    this.canSave = this.canSave.bind(this);
  }

  canSave(event) {
    const errors = validate(this.state.PartNumber, this.state.PartName, this.state.Description, this.state.CarManufacturerName);
    if (Object.keys(errors).some(x => errors[x])){
      alert('Please complete all fields.');
    }else{
      this.props.saveCarPart()
    }
  }

  handlePartNumberChange(event) {
    this.setState({PartNumber: event.target.value});
    this.props.carPart.PartNumber = event.target.value;
  }

  handlePartNameChange(event) {
    this.setState({PartName: event.target.value});
    this.props.carPart.PartName = event.target.value;
  }

  handleDescriptionChange(event) {
    this.setState({Description: event.target.value});
    this.props.carPart.Description = event.target.value;
  }

  handleCarManufacturerNameChange(event) {
    this.setState({CarManufacturerName: event.target.value});
    this.props.carPart.CarManufacturerName = event.target.value;
  }

  render() {
    const errors = validate(this.props.carPart.PartNumber, this.props.carPart.PartName, this.props.carPart.Description, this.props.carPart.CarManufacturerName);
    return (
      <React.Fragment>
          <fieldset>
          <legend>Add or Update Car Part</legend>
            <div className="div-control-organizer">
              <div>
                <label>ID:</label>
                <input name="txtID" className="width-325" disabled={true} type="text" defaultValue={this.state.Id} />
              </div>
              <div>
                <label>Part #:</label>
                <input type="text" className={errors.PartNumber ? "error width-55" : "width-55"} maxLength="5" value={this.state.PartNumber} onChange={this.handlePartNumberChange} />
              </div>
              <div>
                <label>Part Name:</label>
                <input type="text" className={errors.PartName ? "error width-325" : "width-325"} value={this.state.PartName} onChange={this.handlePartNameChange} />
              </div>
              <div>
                <label>Description:</label>
                <textarea className={errors.Description ? "error width-325" : "width-325"} value={this.state.Description} onChange={this.handleDescriptionChange} />
              </div>
              <div>
                <label>Car Manufacturer Name:</label>
                <input type="text" className={errors.CarManufacturerName ? "error width-325" : "width-325"} value={this.state.CarManufacturerName} onChange={this.handleCarManufacturerNameChange} />
              </div>
              <div>
                <a href="#!" className="myButton" onClick={this.props.handleCancelClick}>Cancel</a>
                <a href="#!" className="myButton float-right" onClick={this.canSave}>Save</a>
              </div>
            </div>
          </fieldset>
      </React.Fragment>
    );
  }
}

function validate(PartNumber, PartName, Description,CarManufacturerName){
  return {
    PartNumber: !(PartNumber !== '00000' && PartNumber.length === 5 && !isNaN(PartNumber)),
    PartName: PartName.length === 0,
    Description: Description.length === 0,
    CarManufacturerName: CarManufacturerName.length === 0
  }
}