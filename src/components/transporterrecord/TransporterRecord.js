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
                            <span className="close" onClick={() => props.onDelete(invoice, props.id)} title="delete"> X </span>
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