import React, { Component } from 'react';
import {NumericStepper} from './ScoutingReportMetricComponents'

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
        }
      ]});
    }

    handleChange(index, newValue){
      let metricData = this.state.metricData.slice();
      metricData[index] = {...metricData[index], ...newValue};
      this.setState({
          metricData
      });
    }

    render(){

      let reportMetrics;
      reportMetrics = this.state.metricData.map((reportMetric, index) => {
        // return the appropriate metric Component
        let nextMetric;
        if(reportMetric.metric.type === 'numericStepper'){
          nextMetric = <NumericStepper min={reportMetric.metric.minimumValue}
                                       max={reportMetric.metric.maximumValue}
                                       step={reportMetric.metric.incrementStep}
                                       value={this.state.metricData[index].metricValue}
                                       onChange={e => {this.handleChange(index, {metricValue:e})}}
                                       />
        }
        else if(reportMetric.metric.type === 'timer'){
          nextMetric = <p>Timer not done yet</p>
        }
        else{
          nextMetric = <p>Error: Unknown metric type.</p>;
          console.log('Error: unknown metric type was found');
        }

        // return the next metric in the array
        return(nextMetric);
      });

        return(
          <div>
            <h1>Scouting Report</h1>
            <NumericStepper min={0} max={100} step={1}
                            value={this.state.metricData[0].metricValue}
                            onChange={newValue => {this.handleChange(0, {metricValue:newValue})}} />
            <input type="number" min={0} max={100} step={0.1} />
        </div>
        )
    }
}
