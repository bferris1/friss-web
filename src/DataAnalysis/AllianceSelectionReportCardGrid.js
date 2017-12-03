import React, {Component} from 'react';
import {Row} from 'reactstrap';
import Auth from '../AuthCtrl';

import {AllianceReportCard} from '../Card'

export default class AllianceSelectionReportCardGrid extends Component{

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            eventIds: [],
            events: [],
            value: "1"
        }
    }

    componentDidMount() {

      // populate the events array
      Auth.get('/api/event').then(res => {
            if (res.success){
                this.setState({events:res.events});
            } else {
                //notify
            }
        });

    }

    handleChange(index, e) {

      // Get report
      var modified_report = this.props.reports[index];
      var modified_report_id = modified_report['_id'];

      var modified_report_json = {
          event: e.target.value
      };

      Auth.post('/api/report/alliance/' + modified_report_id, modified_report_json).then((res) => {
            if (res.success) {
                this.props.updateReport(res.report);
            } else {
                alert('Unable to update alliance report with new event.');
            }
        });
    }

    render() {

      let reportCards;
      if(this.props.reports){
          reportCards = this.props.reports.map((reportItem, index) => {
              var eventName = "";
              if (reportItem && reportItem['event']) {
                  // Find the game object in this.state.games that has the same _id as eventItem['game']
                  // Set gameName to gameObject['name']

                  this.state.events.forEach((stateEvent) => {
                      if (reportItem.event === stateEvent._id) {
                          eventName = stateEvent._id;
                      }
                  })
              }
              if(reportItem){

                return (
                    <AllianceReportCard title={reportItem["name"]} description={reportItem["city"]}
                               buttonText={"Set Metric Weights"} col_sm={6}
                               key={index} link={"/test-mw/"}
                               events={this.state.events}
                               onDelete={()=>{this.props.onDelete(reportItem._id)}}
                               onChange = {(e) => {this.handleChange(index, e)}}/>
                );
              }
          });
      }

      return(
            <Row>
                {reportCards}
            </Row>
        )


    }


}
