import React, {Component} from "react";
import './Person.css'

class person extends Component{
    render() {
        return (
            <div className={"Person"} >
                <div onClick={this.props.click}>
                    <div> Name : {this.props.name}</div>
                    <div>Age : {this.props.age}</div>
                    <div>About : {this.props.children}</div>
                </div>
                <input onChange={this.props.input} type="text" defaultValue={this.props.name}/>
            </div>
        )
    }
}


export default person