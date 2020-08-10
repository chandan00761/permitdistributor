import * as React from "react";

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.monthRef = React.createRef();
        this.yearRef = React.createRef();
    }

    loadData = () => {
        let month = this.monthRef.current.value;
        let year = this.yearRef.current.value;
        this.props.onSelectDate(year, month);
    };

    render() {
        const date = new Date();
        const yearComponent = [];
        for (let year = 2020; year <= date.getFullYear(); year++) {
            yearComponent.push(<option key={year} value={year}>{year}</option>);
        }

        return (
            <div className="fullscreen datepicker" data-view={this.props.visible}>
                <select ref={this.monthRef} defaultValue={date.getMonth() + 1}>
                    <option value={1}>Jan</option>
                    <option value={2}>Feb</option>
                    <option value={3}>Mar</option>
                    <option value={4}>Apr</option>
                    <option value={5}>May</option>
                    <option value={6}>Jun</option>
                    <option value={7}>Jul</option>
                    <option value={8}>Aug</option>
                    <option value={9}>Sep</option>
                    <option value={10}>Oct</option>
                    <option value={11}>Nov</option>
                    <option value={12}>Dec</option>
                </select>
                <select ref={this.yearRef}>
                    {yearComponent}
                </select>
                <button className="button" onClick={() => this.loadData()}>GO</button>
            </div>
        )
    }
}

export default DatePicker