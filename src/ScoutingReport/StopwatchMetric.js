import React from 'react';

const leftPad = (width, n) => {
  if ((n + '').length > width) {
	  return n;
  }
  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};

export class StopwatchMetric extends React.Component {
  constructor(props) {
    super(props);

    ["lap", "update", "reset", "toggle"].forEach((method) => {
    	this[method] = this[method].bind(this);
    });

    this.state = this.initialState = {
      isRunning: false,
      lapTimes: [],
      timeElapsed: 0,
    };
  }
  toggle(e) {
    e.preventDefault();
    this.setState({isRunning: !this.state.isRunning}, () => {
      this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
    });
    if(this.state.isRunning){
      this.props.onStop(this.state.timeElapsed);
    }
  }
  lap() {
    const {lapTimes, timeElapsed} = this.state;
    this.setState({lapTimes: lapTimes.concat(timeElapsed)});
  }
  reset(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.setState(this.initialState);
    this.props.onStop(0);
  }
  startTimer() {
    this.startTime = Date.now();
    this.timer = setInterval(this.update, 10);
  }
  update() {
    const delta = Date.now() - this.startTime;
    this.setState({timeElapsed: this.state.timeElapsed + delta});
    this.startTime = Date.now();
  }
  render() {
    const {isRunning, lapTimes, timeElapsed} = this.state;
    return (
      <div style={{marginTop:'15px'}}>
        <p style={{marginBottom:'5px'}}>{this.props.label}</p>
        <TimeElapsed id="timer" timeElapsed={timeElapsed} />
        <button onClick={this.toggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={this.reset}
          disabled={!isRunning && !timeElapsed}
         >
          {'Reset'}
        </button>
        {lapTimes.length > 0 && <LapTimes lapTimes={lapTimes} />}
      </div>
    );
  }
}

class TimeElapsed extends React.Component {
  getUnits() {
    const seconds = this.props.timeElapsed / 1000;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 1).toFixed(3).substring(2)
    };
  }
  render() {
    const units = this.getUnits();
    return (
      <div id={this.props.id} >
        <span>{leftPad(2, units.min)}:</span>
        <span>{leftPad(2, units.sec)}.</span>
        <span>{units.msec}</span>
      </div>
    );
  }
}

class LapTimes extends React.Component {
  render() {
    const rows = this.props.lapTimes.map((lapTime, index) =>
      <tr key={++index}>
        <td>{index}</td>
        <td><TimeElapsed timeElapsed={lapTime} /></td>
      </tr>
    );
    return (
      <table id="lap-times">
        <thead>
          <th>Lap</th>
          <th>Time</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
