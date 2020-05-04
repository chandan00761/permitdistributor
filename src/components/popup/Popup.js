import * as React from "react";

const style = {
    backgroundColor: "blue",
    position: "absolute",
    zIndex : "1",
    padding:"1em",
    top: "1em",
    left:"1em"
}

const Popup = (props) => {
    return (
        <div style={style}>
            {props.value}
        </div>
    )
}

export default Popup