import * as React from "react";
import "./AddPermit.css"

export default class AddPermit extends React.Component {

    constructor() {
        super();
        this.data = {}
    }

    storeValue = (value, event) => {
        this.data = {
            ...this.data,
            [value]: event.target.value,
        };
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.transporters.length !== nextProps.transporters.length;
    }

    validate = () => {
        const setvalues = Object.keys(this.data);
        let d = new Date();
        this.data = {
            ...this.data,
            date : d.getDate() + ":" + d.getMonth() + ":" + d.getFullYear()
        };
        if (!setvalues.includes("destination") || this.data.destination.length === 0) {
            window.alert("destination cannot be empty")
        } else if(!setvalues.includes("vehicle") || this.data.vehicle.length === 0){
            window.alert("vehicle cannot be empty");
        } else if (!setvalues.includes("pref")) {
            this.data = {
                ...this.data,
                pref: "AUTO"
            };
            this.props.onAddClick(this.data)
        } else {
            this.props.onAddClick(this.data);
        }
    };

    render() {
        return (
            <div className="container addPermit">
                <input defaultValue={"Ranchi"} readOnly={true} onChange={this.storeValue.bind(this, "origin")} type="text"
                       placeholder="origin"/>
                <select onChange={this.storeValue.bind(this, "destination")}>
                    <option value="">select destination</option>
                    {
                        this.props.depot.map(depot => {
                            return (
                                <option key={depot.id} value={depot.name}>{depot.name}</option>
                            )
                        })
                    }
                </select>
                <select onChange={this.storeValue.bind(this, "vehicle")}>
                    <option value="">select vehicle</option>
                    <option value="5T">5-T</option>
                    <option value="9T">9-T</option>
                    <option value="15T">15-T</option>
                </select>
                <select onChange={this.storeValue.bind(this, "pref")}>
                    <option value="AUTO">AUTO</option>
                    {
                        this.props.transporters.map(transporter => {
                            return <option key={transporter.id}
                                           value={transporter.id}>{transporter.name}</option>
                        })}
                </select>
                <button onClick={this.validate} id="add-button">ADD</button>
            </div>
        )
    }
}