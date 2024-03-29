import * as React from "react";
import "./Summery.css"
import SummeryTab from "./SummeryTab";

function Summery(props) {
    return (
        <div data-view={props.visible.toString()} result={props.result.toString()} className="container summary">
            <table className="tablePermit tableSummary">
                <thead className="summaryContainer">
                <tr>
                    <th>Depot</th>
                    {props.trasporters.map(transporter => <th colSpan={3}
                                                              key={transporter[2]}>{transporter[0]} [{transporter[1]}]</th>)}
                    <th>Total</th>
                </tr>
                <tr className="truckSummary">
                    <th/>
                    <th>5T</th>
                    <th>9T</th>
                    <th>15T</th>
                    <th>5T</th>
                    <th>9T</th>
                    <th>15T</th>
                    <th>5T</th>
                    <th>9T</th>
                    <th>15T</th>
                    <th/>
                </tr>
                <tr className="truckSummary">
                    <th/>
                    {props.trasporters.map(transporter => (
                        <React.Fragment key={transporter[0]}>
                            <th key={"truck_5T" + transporter[2]}>
                                {transporter[3]}
                            </th>
                            <th key={"truck_9T" + transporter[2]}>
                                {transporter[4]}
                            </th>
                            <th key={"truck_15T" + transporter[2]}>
                                {transporter[5]}
                            </th>
                        </React.Fragment>
                    ))
                    }
                    <th colSpan={3}>{props.total}</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {
                    props.depot.map(item => {
                        return (
                            <SummeryTab key={item.id} depot={item}/>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Summery