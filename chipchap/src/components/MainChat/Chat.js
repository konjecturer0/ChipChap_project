import React from 'react';

// Styles
import ChatLayout from '../../styles/MainChat/ChatLayout.tw';

// Components
import UserSelected from '../../components/MainChat/UserSelected';
import EnterMessage from './EnterMessage';

const SelfMessage = ({message}) => {
    return (
        <div className="flex flex-row justify-end px-16 py-1">
            <div className="max-w-xl bg-blue-600 shadow-md rounded-lg rounded-br-none p-5">
                <p className="font-normal text-white">{message.text}</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-400 mt-1" >{message.time}</p>
                </div>
            </div>
            <div style={{minHeight: '2.5rem', minWidth: '2.5rem'}} className="rounded-full ml-3 self-end shadow-md overflow-hidden">
                    <img className="h-10 w-10" src={require('../../assets/img/faces/user.jpg')} />
            </div>
        </div>
    );
}

const UserMessage = ({message, userid}) => {
    return (
        <div className="flex flex-row justify-start px-16 py-1 pt-4">
            <div className="max-w-xl order-2 bg-white shadow-md rounded-lg rounded-bl-none p-5">
                <p className="font-normal leading-snug text-gray-800">{message.text}</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 mt-1" >{message.time}</p>
                </div>
            </div>
            <div style={{minHeight: '2.5rem', minWidth: '2.5rem'}} className="order-1 rounded-full mr-3 self-end shadow-md overflow-hidden">
                    <img className="h-10 w-10" src={require(`../../assets/img/faces/user.jpg`)} />
            </div>
        </div>
    );
}

class Chat extends React.Component {

    state = {
        messageHistory: [
            // {date: '2020-05-31', time: '14:23:05', text: 'Hey how are you doing', self: true},
            // {date: '2020-05-31', time: '14:24:05', text: "I'm fine u?", self: false},
            // {date: '2020-05-31', time: '14:25:05', text: 'Doing great', self: true},
            // {date: '2020-05-31', time: '14:26:05', text: 'Tomorrow is the end of the world', self: true},
            // {date: '2020-05-31', time: '14:27:05', text: "Well... I'm going for lunch", self: false},
            // {date: '2020-05-31', time: '14:28:05', text: "Bye then!", self: true},
        ],
        // postMessage: [
        //     {date: '2020-05-31', time: '14:28:05', text: "Hey!", to: 'id', from: 'id'},
        // ]
        message: ''
    };
    
    constructor(props) {
        super(props);
        this.mainLayout = React.createRef();
        this.enterField = React.createRef();
    }

    componentDidMount() {
        // WE WOULD FETCH HERE THE COMPLETE MESSAGE HISTORY

        this.props.session.subscribe(`com.chipchap.session.user.actions:listen:${this.props.myid}`, this.updateMessageHistory).then(
            (subscription) => {
                console.log("subscription to <<listen>> (2) successful");
            },
            (error) => {
                console.log("error with subscription to <<listen>> (2)");
                console.log(error);
            }
        );
    }

    componentDidUpdate() {
        // Set message history based on user
        this.updateScrolling();
        // this.props.onMessageStoreClean(this.props.myid);
    }

    updateScrolling() {
        try {
            this.mainLayout.current.scrollTop = this.mainLayout.current.scrollHeight;
        } catch(error) {

        }
    }

    updateMessageHistory = ([msg, userid]) => {
        console.log("UPDATING MESSAGE...");
        console.log(msg[0]);
        let userStore = [];
        if (this.state.messageHistory.length === 0) {
            userStore = [...userStore, {[userid]:[msg[0]]}];
        } else {
            let _i = this.state.messageHistory.findIndex(_user => Object.keys(_user)[0] === userid);
            if ( _i !== -1) {
                userStore = [...userStore, {[userid]:[...this.state.messageHistory[_i][userid], msg[0]]}]
            } else {
                userStore = [...userStore, {[userid]:[msg[0]]}];
            }
        }
        // userStore = [...userStore, {[userid]:[msg[0]]}];
        for (let i=0; i<this.state.messageHistory.length;i++) {
            if (Object.keys(this.state.messageHistory[i])[0] !== userid) {
                userStore = [...userStore, this.state.messageHistory[i]];
            }
            // } else if (Object.keys(this.state.messageHistory[i])[0] === userid) {
            //     userStore = [...userStore, {[userid]:[...this.state.messageHistory[i][userid], msg[0]]}]
            // } else {
            //     userStore = [...userStore, {[userid]:[msg[0]]}];
            // }
        }
        // }
        this.setState({messageHistory: userStore}); 
    }

    onEnterMessage = (e) => {
        if (this.state.message) {
            if (e.keyCode === 13 || e === 'button_send') {
                const msgtext = this.state.message;
                const d = new Date();
                let dateJsonFormat = d.toJSON();
                let t = dateJsonFormat.split('T');
                let date = t[0];
                let time = t[1].split('.')[0] 
                let msg = {date, time, text: msgtext, self:true};

                
                let userStore = [];
                let userid = this.props.user.id;
                if (this.state.messageHistory.length === 0) {
                    userStore = [...userStore, {[userid]:[msg]}];
                } else {
                    let _i = this.state.messageHistory.findIndex(_user => Object.keys(_user)[0] === userid);
                    if (_i !== -1) {
                        userStore = [...userStore, {[userid]:[...this.state.messageHistory[_i][userid], msg]}]
                    } else {
                        userStore = [...userStore, {[userid]:[msg]}];
                    }
                }
                // userStore = [...userStore, {[userid]:[msg]}];
                for (let i=0; i<this.state.messageHistory.length;i++) {
                    if (Object.keys(this.state.messageHistory[i])[0] !== userid) {
                        userStore = [...userStore, this.state.messageHistory[i]];
                    }
                    // } else if (Object.keys(this.state.messageHistory[i])[0] === userid) {
                    //     userStore = [...userStore, {[userid]:[...this.state.messageHistory[i][userid], msg]}]
                    // } else {
                    //     userStore = [...userStore, {[userid]:[msg]}];
                    // }
                }
                // }
                console.log("LOGGING HISTORY>>>>>>>>>>>>>>>>>>>>>>");
                console.log(userStore);
                this.setState({messageHistory: userStore}, () => console.log(this.state.messageHistory));
                this.enterField.current.value = '';
                this.setState({message: ''});
                this.props.session.publish('com.chipchap.session.user.actions:message', [], {msg:msgtext, toid: this.props.user.id});
            }
        }
    }

    onChangeMessage = (e) => {
        this.setState({message: e.target.value});
    }

    onMsgStorage = () => {
        return this.props.messageNotify.map((message) => {
            return <UserMessage userid={this.props.user.id} message={message} />
        })
    }

    onMsgHistory = () => {
        const index = this.state.messageHistory.findIndex(user => Object.keys(user)[0] === this.props.user.id);
        console.log("INSIDE MESSAGE HISTORY");
        console.log(index);
        console.log(this.state.messageHistory);
        // console.log(index);
        // if (index === -1) {
        //     let touser = {};
        //     touser[this.props.user.id] = []
        //     this.setState({messageHistory: [...this.state.messageHistory, touser]});
        // } else {
        if (index !== -1) {
            return this.state.messageHistory[index][this.props.user.id].map((message) => {
                if (message.self) {
                    return <SelfMessage message={message} />
                } else if (!message.self) {
                    return <UserMessage userid={this.props.user.id} message={message} />
                }
            })
        }
        // }
    }

    render() {
        return ( <>
            <UserSelected userid={this.props.user.id} name={this.props.user.name} />
            <ChatLayout ref={this.mainLayout}>
                {this.onMsgStorage()}
                {this.onMsgHistory()}
            </ChatLayout>
            <EnterMessage onmessage={this.onChangeMessage} onenter={this.onEnterMessage} clean={this.enterField} />
        </>
        );
    }
}

export default Chat;