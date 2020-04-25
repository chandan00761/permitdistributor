import * as React from "react";
import "./Summery.css"
import SummeryTab from "./SummeryTab";

function Summery(props){
    return (
        <div className="container summary">
            <table className="tablePermit tableSummary">
                <thead>
                <tr className="summaryContainer">
                    <th>Depot</th>
                    {props.trasporters.map(transporter =><th key={transporter[2]}>{transporter[0]} [{transporter[1]}]</th>)}
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