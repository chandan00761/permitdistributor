import * as React from "react";
import AddPermit from './components/addpermit/AddPermit'
import TransporterRecord from './components/transporterrecord/TransporterRecord'
import Summery from './components/summery/Summery'
import Footer from './components/footer/Footer'
import './App.css'
import DEPOT_NAMES from "./static/depot";

class Distributor extends React.Component {

    state = {
        visible:0,
        transporter: [
            {
                id: "0",
                name: "MS Freight",
                abbr: "MS",
                invoice: []
            },
            {
                id: "1",
                name: "RK Roadlines",
                abbr: "RK",
                invoice: []
            },
            {
                id: "2",
                name: "Bhole Shankar",
                abbr: "BS",
                invoice: []
            }
        ],
        depot: DEPOT_NAMES
    };

    addPermit = (data) => {
        let dist = [];
        let newState = this.state.transporter.slice();
        let assignId = parseInt(data.pref);
        newState.map(transporter => {
            return dist.push(transporter.invoice.length - transporter.invoice.filter(x => x.pref !== "AUTO").length);
        });
        if (data.pref !== "AUTO") {
            newState[data.pref].invoice.push(data);
        } else {
            let deviation = dist.map(item => {
                let sum = dist.reduce((a, b) => a + b, 0);
                return item - sum / dist.length;
            });
            if (deviation.reduce((a, b) => Math.abs(a) + Math.abs(b)) === 0) {
                assignId = Math.floor(Math.random() * dist.length);
                newState[assignId].invoice.push(data);
            } else {
                assignId = deviation.findIndex(i => i === Math.min(...deviation));
                newState[assignId].invoice.push(data);
            }
        }
        let newDepot = this.state.depot.filter(item => {
            if (item.name === data.destination) {
                if (assignId === 0) {
                    return item.MS[data.vehicle] += 1;
                } else if (assignId === 1) {
                    return item.RK[data.vehicle] += 1;
                }
                return item.BS[data.vehicle] += 1;
            } else return null;
        });
        this.setState(newDepot);
        this.setState(newState);
    };

    changeView = (id) => {
        this.setState({visible:id});
    }

    render() {
        return (
            <div>
                <div className="topElement">
                    <AddPermit visible={this.state.visible === 0} onAddClick={this.addPermit} depot={this.state.depot}
                               transporters={this.state.transporter}/>
                    <Summery visible={this.state.visible === 1} depot={this.state.depot} trasporters={this.state.transporter.map(item => {
                        return ([item.abbr, item.invoice.length, item.id])
                    })}/>
                </div>
                <div data-view={this.state.visible === 1} className="resultSetContainer">
                    <table className="tablePermit">
                        <thead className="theadPermit">
                        <tr className="labelContainer">
                            {
                                this.state.transporter.map(transporter => <th
                                    key={transporter.id}>{transporter.name}</th>)
                            }
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="resultSet">
                            {
                                this.state.transporter.map(transporter => {
                                    return <TransporterRecord
                                        key={transporter.id}
                                        values={transporter.invoice}
                                    />
                                })
                            }
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Footer setView={this.changeView}/>
            </div>
        )
    }
}

export default Distributor