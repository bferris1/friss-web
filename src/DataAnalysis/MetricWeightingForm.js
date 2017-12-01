import React, { Component } from 'react';
import {Form, Button, Row} from 'reactstrap';


export default class ScoutingReportFrom extends Component {

  constructor(props){
      super(props);

      /*let metricData = this.props.metrics.map((metric, index) => {
            return {metric:metric, metricID: metric._id, metricWeight: '',
                    boolCheckedScore: '', boolUncheckedScore: '', radioOptions: []}
        });*/


      this.state = {
        eventID: '',
        gameID: '',
        metricData:[{
          metricID: '',
          metric: {
            name: '',
            section: '',
            description: '',
            type: '',
            defaultValue: '',
            maximumValue: '',
            minimumValue: '',
            incrementStep: '', // determines numeric increment/decrement step for frontend UI
            radioOptions: []
          },  // metric info instead of metricID
          metricWeight: '',
          boolCheckedScore: '',
          boolUncheckedScore: '',
          radioWeights: []
        }]
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleRadioWeightChange = this.handleRadioWeightChange.bind(this);
  }

  componentDidMount(){
    this.setState({metricData: [
      {
        metricID: "randomUUID1",
        metric: {
          name: 'Time in Zone',
          section: 'Auto Mode',
          type: 'timer',
          maximumValue: 100
        },
        metricValue: 0
      },
      {
        metricID: "randomUUID1",
        metric: {
          name: 'Zone At End of Auto Mode',
          section: 'Auto Mode',
          type: 'radio',
          radioOptions: ["red", "white", "blue"]
        },
        radioWeights: []

      },
      {
        metricID: "randomUUID2",
        metric: {
          name: 'High Goals',
          section: 'Tele-Op Mode',
          type: 'numericStepper',
          defaultValue: 5,
          maximumValue: 10,
          minimumValue: 0,
          incrementStep: 1
        },
        metricValue: 0
      },
      {
        metricID: "randomUUID2",
        metric: {
          name: 'Low Goals',
          section: 'Tele-Op Mode',
          type: 'numericStepper',
          defaultValue: 5,
          maximumValue: 10,
          minimumValue: 0,
          incrementStep: 0.5
        },
        metricValue: 0
      },
      {
        metricID: "randomUUID1",
        metric: {
          name: 'Card Direction',
          section: 'Tele-Op Mode',
          type: 'radio',
          radioOptions: ["north", "south", "east", "west"]
        },
        radioWeights: []
      },
      {
        metricID: "randomUUID1",
        metric: {
          name: 'Yellow Card',
          section: 'Penalties',
          type: 'boolean',
        },
        metricValue: false
      },
      {
        metricID: "randomUUID1",
        metric: {
          name: 'Red Card',
          section: 'Penalties',
          type: 'boolean',
        },
        metricValue: false
      },
      {
        metricID: "randomUUID1",
        metric: {
          name: 'Comments',
          section: 'General Comments',
          type: 'text',
        },
        metricValue: ''
      }
    ]});
  }

  handleChange(index, newValue){
    let metricData = this.state.metricData.slice();
    console.log(newValue);
    metricData[index] = {...metricData[index], ...newValue};
    this.setState({
        metricData
    });
  }

  handleRadioWeightChange(index, ro_index, newValue){
    console.log("radioWeights[" + ro_index + "]: " + newValue);

    let metricData = this.state.metricData.slice();
    let radioWeight = metricData[index].radioWeights.slice();
    radioWeight[ro_index] = {newValue};
    //metricData[index] = {...metricData[index], radioWeights[ro_index]: newValue};
    this.setState({
        metricData
    });
  }

  render(){

    let reportMetrics;
    let lastSection;
    reportMetrics = this.state.metricData.map((reportMetric, index) => {
      let newSection;
      if(lastSection !== reportMetric.metric.section){
        newSection = <h3 style={{marginBottom:'15px'}}>{reportMetric.metric.section}</h3>
      }

      // return the appropriate metric Component
      let nextMetric;
      if(reportMetric.metric.type === 'numericStepper'){
        nextMetric = (
          <div style={{marginBottom:'20px',marginTop:'20px'}}>
            {newSection}
            <p style={{marginBottom:'5px'}}>{reportMetric.metric.name} (numeric)</p>
            <span>Weight: </span>
            <input type="number" onChange={e => {this.handleChange(index, {metricWeight:e.target.value})}}/>
          </div>

        );
      }
      else if(reportMetric.metric.type === 'timer'){
        nextMetric = (
          <div style={{marginBottom:'20px',marginTop:'20px'}}>
            {newSection}
            <p style={{marginBottom:'5px'}}>{reportMetric.metric.name} (timer)</p>
            <span>Weight: </span>
            <input type="number" onChange={e => {this.handleChange(index, {metricWeight:e.target.value})}}/>
          </div>

        )
      }
      else if(reportMetric.metric.type === 'boolean'){
        nextMetric = (
          <div style={{marginBottom:'20px',marginTop:'20px'}}>
            {newSection}
            <h5 style={{marginBottom:'5px'}}>{reportMetric.metric.name} (timer)</h5>
            <span>Checked Score: </span>
            <input className="form-control" type="number" style={{marginBottom:'5px'}}
              onChange={e => {this.handleChange(index, {boolCheckedScore:e.target.value})}}/>
            <br/>
            <span>Unchecked Score: </span>
            <input className="form-control" type="number" style={{marginBottom:'5px'}}
              onChange={e => {this.handleChange(index, {boolUncheckedScore:e.target.value})}}/>
          </div>

        );
      }
      else if(reportMetric.metric.type === 'radio'){
          let radioOptions = reportMetric.metric.radioOptions.map((radioOption, ro_index) => {
            return(

              <span>"{radioOption}" Score:
                <input className="form-control" type="number"
                  onChange={e => {this.handleRadioWeightChange(index, ro_index, e.target.value)}}/>
                <br/>
              </span>
            );
          });

          nextMetric = (
            <div className="metricWeight" style={{marginTop:'15px'}}>
              {newSection}
              <label style={{marginBottom:'5px',marginRight:'5px'}}>{reportMetric.metric.name}</label>
              <br/>
              {radioOptions}
            </div>
          );
      }
      else{}

      // return the next metric in the array
      lastSection = reportMetric.metric.section;
      return(nextMetric);
    });

    return(
      <div>
        <h1>Alliance Selection Weighting</h1>
        <hr/>
        <Form style={{marginBottom:'30px'}}
                      onSubmit={e => {e.preventDefault();
                      this.props.onSubmit(this.state.metricData)}}>

          {reportMetrics}
          <Button color="primary" type="submit">Submit</Button>
          <Button className={"ml-2"} color={"secondary"}>Clear</Button>
        </Form>

      </div>
    );
  }
}