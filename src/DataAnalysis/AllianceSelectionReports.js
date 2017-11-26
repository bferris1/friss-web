import React, { Component } from 'react';
import {Button} from 'reactstrap';
import Auth from '../AuthCtrl';
import Alerts from '../Alerts'

export default class AllianceSelectionReports extends Component{

  constructor(){
      super();
      this.handleChange = this.handleChange.bind(this);
      this.handleAddReport = this.handleAddReport.bind(this);
      this.fetchReports = this.fetchReports.bind(this);
      this.handleDeleteReport = this.handleDeleteReport.bind(this);
      this.state = {
          addForm: false,
          allianceSelectionReports: [],
          alerts:{}
      }
  }

  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }

  render(){

      let newForm = null;
      let newFormLink = <Button color="link" name={"addForm"} value={true}
                                onClick={this.handleChange}>Add a New Alliance Selection Report</Button>
      if(this.state.addForm){
          newForm = <AllianceSelectionReportForm addReport={this.handleAddReport} />;
          newFormLink = null;
      }


      return(
          <div className='AllianceSelectionReports'>
              <h1>Create Alliance Selection Reports</h1>
              <Alerts alerts={this.state.alerts}/>
              {newFormLink}
              {newForm}
              <AllianceSelectionReportCardGrid reports={this.state.allianceSelectionReports}
              onDelete={this.handleDeleteGame} />
          </div>
      )
  }

}
