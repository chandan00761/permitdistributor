/**
 * AUTHOR : Chandan Mahto
 * GITHUB : chandanmahto007
 * Version : 1.1.0
 * Date of creation : 25-4-2020
 */

import * as React from "react";
import AddPermit from './components/addpermit/AddPermit'
import DatePicker from "./components/datepicker/DatePicker"
import TransporterRecord from './components/transporterrecord/TransporterRecord'
import Summery from './components/summery/Summery'
import Footer from './components/footer/Footer'
import Axios from './axios-instance/axios'
import './App.css'
import DEPOT_NAMES from "./static/depot";

class Distributor extends React.Component {

    constructor(props) {
        super(props);
        this.date = new Date();
    }

    state = {
        visible: 0,
        showResult: false,
        loading: true,
        current: true,
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
        /**
         *
         *
         *    @
         */

        /**
         * @param data
         *
         * Data is received and saved locally in the format.
         * {
         *        date : "8:4:2020",
         *        destination: "Ranchi",
​        *        pref: "AUTO" || "0" || "1" || "2",
​        *        vehicle: "5T",
         * }
         *
         * We take into account both the distribution according to destination and number of invoices with each transporter.
         * Deviation is calculated based on the previous data and new invoice is assigned to that transporter whose
         * difference in mean and standard deviation is maximum.
         *
         * @type {*[]}
         */

        let newTransporterState = [...this.state.transporter];
        let id = parseInt(data.pref);
        if (data.pref === "AUTO") {
            let dist = [], dist2 = [];
            for (let i = 0; i < this.state.transporter.length; i++) {
                let sum = this.state.transporter[i].invoice.reduce((s, value) => {
                    if (value.destination === data.destination && value.pref === "AUTO")
                        return s + 1;
                    return s + 0;
                }, 0);
                dist.push(sum);
                sum = this.state.transporter[i].invoice.length - this.state.transporter[i].invoice.filter(x => x.pref !== "AUTO").length;
                dist2.push(sum);
            }
            let mean = dist.reduce((a, b) => a + b, 0) / dist.length;
            let mean2 = dist2.reduce((a, b) => a + b, 0) / dist2.length;
            if (dist.every((val) => val === mean)) {
                id = Math.floor(Math.random() * dist.length); // random invoice is assigned if same distribution
            } else {
                let derivation = dist.map(item => item - mean);
                let derivation2 = dist2.map(item => item - mean2);
                if (Math.abs(Math.min(...derivation) - Math.min(...derivation2)) > 1)
                    id = derivation2.findIndex(i => i === Math.min(...derivation2));
                else
                    id = derivation.findIndex(i => i === Math.min(...derivation));
            }
        }

        let newDepot = this.state.depot.filter(item => {
            if (item.name === data.destination) {
                if (id === 0) {
                    return item.MS[data.vehicle] += 1;
                } else if (id === 1) {
                    return item.RK[data.vehicle] += 1;
                }
                return item.BS[data.vehicle] += 1;
            } else return null;
        });

        newTransporterState[id].invoice.push(data);
        this.props.pushMessage("Permit Added!");
        this.setState({transporter: newTransporterState});
        this.setState(newDepot);
    };

    deletePermit = (invoice, id) => {
        /**
         * Simply removes the permit from the state. Doesn't redistribute the invoices but new invoices are distributed
         * evenly. Modal confirmation is required to delete the invoice to prevent accidental deletions.
         */
        this.props.pushModalAction({
            message: "Do you want to delete the invoice?",
            submitText: "DELETE",
            cancelText: "CANCEL",
            submit: () => {
                id = parseInt(id);
                let temp = [...this.state.transporter];
                const index = temp[id].invoice.findIndex((elem) => elem === invoice);
                console.log(id);
                console.log(temp[id].invoice);
                temp[id].invoice.splice(index, 1);
                console.log(temp[id].invoice);
                this.setState({transporter: temp});
            },
            cancel: "CLOSE_MODAL"
        });
    };

    changeView = (id) => {
        this.setState({visible: id});
    };

    saveData = () => {
        /**
         * Saves data to the Firebase realtime database according to Year and month. Only saves data if SAVE DATA link
         * is clicked.
         * The database tree is:-
         *
         * FIREBASE DATABASE ──────────┐
         *                             │
         *                             │
         *                             ├──── 2020 ─────┐
         *                             │               │
         *                             │               │───── January ───── this.state.transporter
         *                             │               │
         *                             │               │───── February ───── this.state.transporter
         *                             │               │
         *                             │               │───── March ───── this.state.transporter
         *                             │
         *                             │
         *                             │
         *                             ├──── 2021 ─────┐
         *                             │               │
         *                             │               │───── January ───── this.state.transporter
         *                             │               │
         *                             │               │───── February ───── this.state.transporter
         *                             │               │
         *                             │               │───── March ───── this.state.transporter
         */
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        this.props.pushModalAction({
            message: "You are about to save the data to cloud. This will replace the data already present there and " +
                "there is no way ot get that data back. Are you sure you want to continue?",
            submitText: "Continue",
            cancelText: "Go back",
            submit: () => {
                this.setState({loading: true});
                Axios.put("/" + year + "/" + month + ".json/", this.state.transporter)
                    .then(response => {
                        if (response.status === 200) {
                            this.props.pushMessage("Data Saved");
                        } else this.props.pushMessage("Data Saving failed");
                    })
                    .catch((error) => {
                        this.props.pushMessage("Network Error please check console.");
                        console.error(error);
                    })
                    .finally(() => this.setState({loading: false}));
            },
            cancel: "CLOSE_MODAL"
        });
    };

    getData = (year, month, auto = true) => {
        let newState = auto ? [
            ...this.state.transporter
        ] : [
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
        ];
        const newCurrent = this.date.getMonth() + 1 === month;
        Axios.get("/" + year + "/" + month + ".json")
            .then(response => {
                if (response.status === 200 && response.data !== null) {
                    let data = response.data;
                    newState = [];
                    for (let val in data) {
                        if (!data[val].hasOwnProperty('invoice')) {
                            newState.push({
                                ...data[val],
                                invoice: []
                            })
                        } else newState.push(data[val]);
                    }
                    this.props.pushMessage("Data loaded successfully");
                }
                if (response.status !== 200)
                    this.props.pushMessage("Data couldn't be loaded. Please refresh!");
                else
                    this.props.pushMessage("Selected month has no data!");
            })
            .catch(error => {
                this.props.pushMessage("Network error!");
                console.error(error);
            })
            .finally(() => {
                this.setState({loading: false, transporter: newState, current: newCurrent})
            });
    };

    componentDidMount() {
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        this.getData(year, month);
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loader">
                    Loading....
                </div>
            )
        } else {
            return (
                <div>
                    <div className="topElement" data-result={this.state.showResult.toString()}>
                        <AddPermit visible={this.state.visible === 0} result={this.state.showResult}
                                   onAddClick={this.addPermit} depot={this.state.depot}
                                   current={this.state.current}
                                   transporters={this.state.transporter}/>
                        <span className="controls">
                            <div className="fullscreen" id="result-control-toggler" data-view={this.state.visible === 0}
                                 onClick={() => this.setState((prevState) => (
                                     {showResult: !prevState.showResult}
                                 ))}>
                                {this.state.showResult ? "SHOW CONTROLS" : "SHOW RESULT"}
                            </div>
                            <div className="fullscreen" data-view={this.state.visible === 0}
                                 onClick={() => this.saveData()}>
                                SAVE DATA
                            </div>
                            <DatePicker visible={this.state.visible === 0}
                                        onSelectDate={(year, month) => this.getData(year, month, false)}/>
                        </span>
                        <Summery visible={this.state.visible === 1} result={this.state.showResult}
                                 depot={this.state.depot}
                                 total={this.state.transporter.reduce((s, t) => s + t.invoice.length, 0)}
                                 trasporters={this.state.transporter.map(item => {
                                     let T5 = 0, T9 = 0, T15 = 0;
                                     for (let i in item.invoice) {
                                         switch (item.invoice[i].vehicle) {
                                             case "5T" :
                                                 T5 += 1;
                                                 break;
                                             case "9T" :
                                                 T9 += 1;
                                                 break;
                                             case "15T" :
                                                 T15 += 1;
                                                 break;
                                             default:
                                                 console.error("Wrong truck type " + item.invoice[i].vehicle);
                                         }
                                     }
                                     return ([item.abbr, item.invoice.length, item.id, T5, T9, T15])
                                 })}
                        />
                    </div>
                    <div data-view={this.state.visible === 1} className="resultSetContainer">
                        <table className="tablePermit">
                            <thead className="theadPermit" data-result={this.state.showResult.toString()}>
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
                                            id={transporter.id}
                                            onDelete={(invoice, id) => this.deletePermit(invoice, id)}
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
}

export default Distributor