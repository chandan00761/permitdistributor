import * as React from "react";

class SummeryTab extends React.Component {

    render() {
        return (
            <tr className="summaryTab">
                <td>{this.props.depot.name}</td>
                <td>{parseInt(this.props.depot.MS["5T"])}</td>
                <td> {parseInt(this.props.depot.MS["9T"])}</td>
                <td> {parseInt(this.props.depot.MS["15T"])}</td>
                <td>{parseInt(this.props.depot.RK["5T"])}</td>
                <td> {parseInt(this.props.depot.RK["9T"])}</td>
                <td> {parseInt(this.props.depot.RK["15T"])}</td>
                <td>{parseInt(this.props.depot.BS["5T"])}</td>
                <td> {parseInt(this.props.depot.BS["9T"])}</td>
                <td> {parseInt(this.props.depot.BS["15T"])}</td>
                <td>{parseInt(this.props.depot.MS["5T"]) + parseInt(this.props.depot.MS["9T"])
                + parseInt(this.props.depot.MS["15T"]) + parseInt(this.props.depot.RK["5T"])
                + parseInt(this.props.depot.RK["9T"]) + parseInt(this.props.depot.RK["15T"])
                + parseInt(this.props.depot.BS["5T"]) + parseInt(this.props.depot.BS["9T"])
                + parseInt(this.props.depot.BS["15T"])}</td>
            </tr>
        )
    }
}

export default SummeryTab