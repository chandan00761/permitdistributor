import * as React from "react";
class SummeryTab extends React.Component{

    render() {
        return(
            <tr className="summaryTab">
                <td>{this.props.depot.name}</td>
                <td>{this.props.depot.MS["5T"] + this.props.depot.MS["9T"] + this.props.depot.MS["15"]}</td>
                <td>{this.props.depot.RK["5T"] + this.props.depot.RK["9T"] + this.props.depot.RK["15"]}</td>
                <td>{this.props.depot.BS["5T"] + this.props.depot.BS["9T"] + this.props.depot.BS["15"]}</td>
            </tr>
        )
    }
}

export default SummeryTab