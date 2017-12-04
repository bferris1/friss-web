import React from 'react';

export default class DataList extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {

        let metricValuesList = [];

        if (this.props.metricValues.length > 0) {

            for (let i = 0; i < this.props.metricValues.length; i++) {

                metricValuesList[i] = (
                    <tr key={i}>
                        <td>{this.props.matches[i]}</td>
                        <td>{this.props.metricValues[i]}</td>
                    </tr>
                );
            }
        }

        return(
            <table>
                <thead>
                    <tr>
                        <th>Match Number</th>
                        <th>Metric Value</th>
                    </tr>
                </thead>
                <tbody>
                    {metricValuesList}
                </tbody>
            </table>
        );


    }
}