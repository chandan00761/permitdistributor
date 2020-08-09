import * as React from "react";
import styles from './Messages.module.sass';

class Messages extends React.Component{

    state = {
        messages : [],
        show: true
    };

    pushMessage = (message) => {
        let newMessages = [message];
        this.setState({messages: newMessages});
    };

    scheduleMessage = () => {

    };

    timeMessage = () => {

    };

    closeClicked = () => {
        let messagesVar = [...this.state.messages];
        messagesVar.shift();
        this.setState({messages: messagesVar});
    };

    render() {
        let messageComponent = null;
        if (this.state.show && this.state.messages.length !== 0) {
                messageComponent = <div className={styles.messageContainer}>
                    <span className={styles.messageClose} title={"close"} onClick={() => this.closeClicked()}>X</span>
                    <div className={styles.messageBody}>
                        {this.state.messages[0]}
                    </div>
                </div>
        }

        return(
            <React.Fragment>
                {messageComponent}
                {React.cloneElement(this.props.children, {
                    pushMessage: this.pushMessage,
                    scheduleMessage: this.scheduleMessage,
                    timeMessage: this.timeMessage,
                })}
                {messageComponent}
            </React.Fragment>
        )

    }
}

export default Messages
