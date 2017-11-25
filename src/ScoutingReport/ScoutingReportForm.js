import React, { Component } from 'react';
import {Form, Button, Row} from 'reactstrap';

import {NumericStepper, CheckboxMetric, RadioOptionMetric, TextboxMetric} from './ScoutingReportMetricComponents';
import {StopwatchMetric} from './StopwatchMetric';

export default class ScoutingReportFrom extends Component{

    constructor(props){
        super(props);
        // un init state
        this.state={
          matchID: '',
          eventID: '',
          teamID: '',
          robotPos: '',
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
            metricValue: ''
          }],
          submittedBy: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
          metricValue: 0
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
          metricValue: 0
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

    handleSubmit(e){
      e.preventDefault();
      console.log("submit");
    }

    handleChange(index, newValue){
      let metricData = this.state.metricData.slice();
      if(metricData[index].metric.type === 'numericStepper'){
        let upperBound = metricData[index].metric.maximumValue;
        let lowerBound = metricData[index].metric.minimumValue;
        // console.log(upperBound);
        // console.log(lowerBound);
        if(newValue.metricValue > upperBound || newValue.metricValue < lowerBound){
          console.log("Error: numeric bound reached");
          return;
        }
      }
      console.log(newValue);
      metricData[index] = {...metricData[index], ...newValue};
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
          newSection = <h3 style={{marginTop:'15px'}}>{reportMetric.metric.section}</h3>
        }

        // return the appropriate metric Component
        let nextMetric;
        if(reportMetric.metric.type === 'numericStepper'){
          nextMetric = (
            <div>
              {newSection}
              <NumericStepper name={reportMetric.metric.name}
                               min={reportMetric.metric.minimumValue}
                               max={reportMetric.metric.maximumValue}
                               step={reportMetric.metric.incrementStep}
                               value={this.state.metricData[index].metricValue}
                               onChange={e => {this.handleChange(index, {metricValue:e})}}
              />
            </div>

          );
        }
        else if(reportMetric.metric.type === 'timer'){
          nextMetric = (
            <div>
              {newSection}
              <StopwatchMetric label={reportMetric.metric.name} onStop={e => {this.handleChange(index, {metricValue:e})}}/>
            </div>

          )
        }
        else if(reportMetric.metric.type === 'boolean'){
          nextMetric = (
            <div>
              {newSection}
              <CheckboxMetric name={reportMetric.metric.name}
                value={this.state.metricData[index].metricValue}
                onChange={e => {this.handleChange(index, {metricValue:e.target.checked})}}
              />
            </div>

          );
        }
        else if(reportMetric.metric.type === 'radio'){
            let radioOptions = reportMetric.metric.radioOptions.map((radioOption, index) => {
              return(
                <RadioOptionMetric name={reportMetric.metric.name} option={radioOption} />
              );
            });

            nextMetric = (
              <div style={{marginTop:'15px'}}>
                {newSection}
                <label style={{marginBottom:'5px',marginRight:'5px'}}>{reportMetric.metric.name}</label>
                {radioOptions}
              </div>
            );
        }
        else if(reportMetric.metric.type === 'text'){
          nextMetric = (
            <div style={{marginTop:'15px'}}>
              {newSection}
              <TextboxMetric name={reportMetric.metric.name}
                value={this.state.metricData[index].metricValue}
                onChange={e => {this.handleChange(index, {metricValue:e.target.value})}}
              />
            </div>
          );
        }
        else{
          nextMetric = <p>Error: Unknown metric type.</p>;
          console.log('Error: unknown metric type was found');
        }

        // return the next metric in the array
        lastSection = reportMetric.metric.section;
        return(nextMetric);
      });

        return(
          <div style={{marginBottom:'30px'}}>
            <h1>Scouting Report</h1>
            <h2>Match #{this.props.match.params.matchNum}</h2>
            {/*<h3>Team #{this.props.teamNumber} -- {this.props.teamNickName}</h3>*/}
            <hr />
            <Form style={{marginBottom:'30px'}} onSubmit={this.handleSubmit}>
              {reportMetrics}
              <Button color="primary" type="submit">Submit</Button>
            </Form>


          </div>
        )
    }
}
