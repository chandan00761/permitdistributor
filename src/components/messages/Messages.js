import * as React from "react";
import styles from './Messages.module.sass';

class Messages extends React.Component {

    /**
     * Component to create a messaging showing system.
     * The actions must be passed as in object through pushModalAction() in the following format
     * {
            message: "Do you want to delete the invoice?",
            submitText: "Delete",
            cancelText: "Cancel",
            submit: () => console.log("Submitted"),
            cancel: () => console.log("Cancelled")
        }
     *
     * Here cancel can be a function, null or "CLOSE_MODAL" string as required.
     * @param props
     */

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    state = {
        messages: [],
        actions: null,
        show: true,
        modalShow: true
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

    pushModalAction = (action) => this.setState({actions: action});

    closeModal = () => this.setState({actions: null});

    render() {
        let messageComponent = null;
        let messageModalComponent = null;
        if (this.state.show && this.state.messages.length !== 0) {
            messageComponent = <div className={styles.messageContainer}>
                <span className={styles.messageClose} title={"close"} onClick={() => this.closeClicked()}>X</span>
                <div className={styles.messageBody}>
                    {this.state.messages[0]}
                </div>
            </div>
        }

        if (this.state.modalShow && this.state.actions) {
            const action = this.state.actions;
            messageModalComponent = <div className={styles.messageModalContainer}
                                         onClick={(e) => {
                                             if (e.target !== this.modalRef.current)
                                                 this.closeModal();
                                         }}>
                <div className={styles.messageModal} ref={this.modalRef}>
                    <div className={styles.messageModalMessage}>
                        {action.message}
                        <span title="close" onClick={this.closeModal}>X</span>
                    </div>
                    <div className={styles.messageModalButtons}>
                        <button type="submit" onClick={action.submit}>{action.submitText}</button>
                        <button type="cancel" onClick={action.cancel === "CLOSE_MODAL" ? this.closeModal: action.cancel}>{action.cancelText}</button>
                    </div>
                </div>
            </div>
        }

        return (
            <React.Fragment>
                {messageComponent}
                {React.cloneElement(this.props.children, {
                    pushMessage: this.pushMessage,
                    scheduleMessage: this.scheduleMessage,
                    timeMessage: this.timeMessage,
                    pushModalAction: this.pushModalAction,
                })}
                {messageComponent}
                {messageModalComponent}
            </React.Fragment>
        )

    }
}

export default Messages
