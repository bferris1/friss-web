import React, { Component } from 'react';

export default class AddMember extends Component{

    render(){
        return (
          <div>
            <h3>Add Member to Team</h3>
             <form>
              <div className='form-group'>
                <label htmlfor='name'>Name</label>
                <input type="text" className='form-control' id="name" ref="memberName" />
              </div>
              <div className='form-group'>
                <label htmlfor='email'>Email</label>
                <input type="text" className='form-control' id='email' ref="memberEmail" />
              </div>
              <div>
                <label>Permissions{"\n"}</label>
              </div>
              <div className='checkbox'>
                <label>
                  <input type="checkbox" value="" ref='scout' /> Scouter
                </label>
              </div>
              <div className='checkbox'>
                <label>
                  <input type="checkbox" value="" /> Data Analizer
                </label>
              </div>
              <input type="submit" className='btn btn-info' value="Submit" />
            </form>
          </div>
        )
    }
}
