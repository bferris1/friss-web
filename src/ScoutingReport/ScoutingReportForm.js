import React, { Component } from 'react';
import {NumericStepper, Checkbox} from './ScoutingReportMetricComponents';
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
            incrementStep: 1
          },
          metricValue: 0
        }
      ]});
    }

    handleChange(index, newValue){
      console.log(newValue);
      let metricData = this.state.metricData.slice();
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
        else{
          nextMetric = <p>Error: Unknown metric type.</p>;
          console.log('Error: unknown metric type was found');
        }

        // return the next metric in the array
        lastSection = reportMetric.metric.section;
        return(nextMetric);
      });

        return(
          <div>
            {reportMetrics}
          </div>
        )
    }
}
