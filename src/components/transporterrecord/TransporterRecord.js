import * as React from "react";
import './TransporterRecord.css'

function TransporterRecord(props) {
    return (
        <td className="permitRecordContainer">
            {props.values.map((invoice, index) => {
                return (
                    <div key={index} className="permitRecord">
                        <div>
                            {invoice.destination} - {invoice.vehicle}
                        </div>
                        <div>
                            {invoice.date}
                        </div>
                    </div>
                )
            })}
        </td>
    )
}

export default TransporterRecord