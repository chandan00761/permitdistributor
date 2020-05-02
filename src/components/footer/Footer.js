import * as React from "react";
import './Footer.sass'


const Footer = (props) => {
    return (
            <footer>
                <div onClick={() => props.setView(0)}>
                    Add Permit
                </div>
                <div onClick={() => props.setView(1)}>
                    View Summary
                </div>
            </footer>
        )
}


export default Footer