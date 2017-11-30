import React, {Component} from 'react';
import {Button, Form} from 'reactstrap';

import {CheckboxMetric, NumericStepper, RadioOptionMetric, TextboxMetric} from './ScoutingReportMetricComponents';
import {StopwatchMetric} from './StopwatchMetric';

export default class ScoutingReportFrom extends Component{

    constructor(props){
        super(props);
        let metricData = this.props.metrics.map((metric, index) => {
            return {metric:metric, metricID: metric._id, metricValue: ''}
        });
        // un init state
        this.state={
            matchID: '',
            eventID: '',
            teamID: '',
            robotPos: '',
            metrics: [],
            metricData: metricData,
            oldMetricData:[{
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

    }

    handleSubmit(e){
        e.preventDefault();
        console.log("submit");
        console.log(this.state);
    }

    handleChange(index, newValue){
        let metricData = this.state.metricData.slice();
        // if(metricData[index].metric.type === 'Integer'){
        //     let upperBound = metricData[index].metric.maximumValue;
        //     let lowerBound = metricData[index].metric.minimumValue;
        //     // console.log(upperBound);
        //     // console.log(lowerBound);
        //     if(newValue.metricValue > upperBound || newValue.metricValue < lowerBound){
        //         console.log("Error: numeric bound reached");
        //         return;
        //     }
        // }
        console.log(newValue);
        metricData[index] = {...metricData[index], metricValue: newValue};
        this.setState({
            metricData
        });
    }

    render(){

        let reportMetrics = [];
        let lastSection;
        if (!this.state.metricData)
            return null;

        reportMetrics = this.state.metricData.map((reportMetric, index) => {
            let newSection;
            if(lastSection !== reportMetric.metric.section){
                newSection = <h3 style={{marginTop:'15px'}}>{reportMetric.metric.section}</h3>
            }

            // return the appropriate metric Component
            let nextMetric;
            if(reportMetric.metric.type === 'Integer'){
                nextMetric = (
                    <div key={reportMetric.metric._id}>
                        {newSection}
                        <NumericStepper name={reportMetric.metric.name}
                                        min={reportMetric.metric.minimumValue || Number.MIN_SAFE_INTEGER}
                                        max={reportMetric.metric.maximumValue || Number.MAX_SAFE_INTEGER}
                                        step={reportMetric.metric.incrementStep || 1}
                                        value={this.state.metricData[index].metricValue || 0}
                                        onChange={newVal => {this.handleChange(index, newVal)}}
                        />
                    </div>

                );
            }
            else if(reportMetric.metric.type === 'Time'){
                nextMetric = (
                    <div key={reportMetric.metric._id}>
                        {newSection}
                        <StopwatchMetric label={reportMetric.metric.name} onStop={e => {this.handleChange(index, {metricValue:e})}}/>
                    </div>

                )
            }
            else if(reportMetric.metric.type === 'Boolean'){
                nextMetric = (
                    <div key={reportMetric.metric._id}>
                        {newSection}
                        <CheckboxMetric name={reportMetric.metric.name}
                                        value={this.state.metricData[index].metricValue}
                                        onChange={e => {this.handleChange(index, {metricValue:e.target.checked})}}
                        />
                    </div>

                );
            }
            else if(reportMetric.metric.type === 'Radio'){
                let radioOptions = reportMetric.metric.radioOptions.map((radioOption, radioIndex) => {
                    return(
                        <RadioOptionMetric key={radioIndex}
                                           checked={this.state.metricData[index].metricValue === radioOption}
                                           onChange={e => {this.handleChange(index, e.target.value)}}
                                           name={reportMetric.metric.name}
                                           option={radioOption} />
                    );
                });

                nextMetric = (
                    <div key={reportMetric.metric._id} style={{marginTop:'15px'}}>
                        {newSection}
                        <label style={{marginBottom:'5px',marginRight:'5px'}}>{reportMetric.metric.name}</label>
                        {radioOptions}
                    </div>
                );
            }
            else if(reportMetric.metric.type === 'text'){
                nextMetric = (
                    <div key={reportMetric.metric._id} style={{marginTop:'15px'}}>
                        {newSection}
                        <TextboxMetric name={reportMetric.metric.name}
                                       value={this.state.metricData[index].metricValue}
                                       onChange={e => {this.handleChange(index, {metricValue:e.target.value})}}
                        />
                    </div>
                );
            }
            else{
                nextMetric = <p key={index}>Error: Unknown metric type.</p>;
                console.log('Error: unknown metric type was found');
            }

            // return the next metric in the array
            lastSection = reportMetric.metric.section;
            return(nextMetric);
        });

        return(
            <div style={{marginBottom:'30px'}}>
                <h1>Scouting Report</h1>
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
