import React, { Component } from 'react';
import {Button} from 'reactstrap';
import Auth from '../AuthCtrl';
import Alerts from '../Alerts'

import AllianceSelectionReportForm from './AllianceSelectionReportForm';
import AllianceSelectionReportCardGrid from './AllianceSelectionReportCardGrid';

export default class AllianceSelectionReports extends Component{

  constructor(){
      super();
      this.handleChange = this.handleChange.bind(this);
      this.handleAddReport = this.handleAddReport.bind(this);
      this.updateReports = this.updateReports.bind(this);
      this.updateReport = this.updateReport.bind(this);
      this.handleDeleteReport = this.handleDeleteReport.bind(this);
      this.state = {
          showAddReportForm: false,
          eventIds: [],
          allianceSelectionReports: [],
          alerts:{}
      }
  }

  componentDidMount() {
    this.updateReports();
  }

  updateReports() {
    Auth.get('/api/report/alliance').then(res => {
            if (res.success){
                this.setState({allianceSelectionReports:res.reports}); // This needs confirmed or fixed.
            } else {
                //notify
            }
        });

  }

  handleAddReport(reportObj){
    let report = {
      name: reportObj["name"],
      description: reportObj["description"],
      // more needs to be added when bryan gets here
    }
    // Add event to event database.
    Auth.post('/api/report/alliance', report).then((res) => {

        if (res.success) {
            this.setState({
                allianceSelectionReports: [...this.state.allianceSelectionReports, res.report] // res.report needs confirmed
            });
        } else
            this.setState({alerts: {danger: res.error}});
        setTimeout(() => {
            this.setState({alerts: {}})
        }, 6000);
    });

    this.setState({
        showAddReportForm: false
    });

  }

  handleDeleteReport(reportId) {
    Auth.delete(`/api/report/alliance/${reportId}`).then(res => {
            console.log(res);
            if (res.success) {
                //notify
            }
            this.updateReports();
        });
  }

  updateReport(updatedReport) {

    var reports = this.state.allianceSelectionReports;
    for (var i = 0; i < reports.length; i++) {
        if (reports[i]._id === updatedReport._id) {
            reports[i] = updatedReport;
            break;
        }
    }

    this.setState({allianceSelectionReports: reports});

  }

  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }



  render(){

      let newForm = null;
      let newFormLink = <Button color="link" name={"showAddReportForm"} value={true}
                                onClick={this.handleChange}>Add a New Alliance Selection Report</Button>
      if(this.state.showAddReportForm){
          newForm = <AllianceSelectionReportForm addReport={(eventObj) => this.handleAddReport(eventObj)} />;
          newFormLink = null;
      }


      return(
          <div className='AllianceSelectionReports'>
              <h1>Create Alliance Selection Reports</h1>
              <Alerts alerts={this.state.alerts}/>
              {newFormLink}
              {newForm}
              <AllianceSelectionReportCardGrid reports={this.state.allianceSelectionReports}
              onDelete={this.handleDeleteReport} updateReport = {this.updateReport}
              reports={this.state.allianceSelectionReports} eventIds={this.state.eventIds}/>
          </div>
      )
  }

}
