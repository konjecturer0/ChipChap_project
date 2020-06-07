import React from 'react';

// MicroComponents
import NewChat from '../components/buttons/NewChat';
import ChatHead from '../components/ChatsHead';

// Components
import Contacts from '../components/Contacts';
import Chat from '../components/MainChat/Chat';

// Styles
import Container from '../styles/App/container.tw';

// Autobahn
import autobahn from 'autobahn';

class App extends React.Component {
    

    constructor(props) {
        super(props);
        this.sess = null;
    }

    state = {
        userid: null,
        userSelect: '',
        users: [],
        messageStore: [],
        filterChat: '',
        messagecount: []
    };

    componentDidMount() {
        let connection = new autobahn.Connection({transports:[{type:"websocket", url: 'ws://192.168.2.115:8080'}], realm: 'chat'});
        connection.onopen = (session, details) => {
            console.log("!! Got a connection");
            console.log(session);
            console.log(details);
            this.sess = session;
            session.call('com.chipchap.session.user.actions:contacts').then(
                (result) => {
                    // console.log(result[0]);
                    this.setState({users: [ ...this.state.users, ...result]});
                },
                (error) => {
                    console.log("!!ERROR");
                    console.log(error);
                }
            );
            session.call('com.chipchap.session.user.actions:getmyID').then(
                (result) => {
                    this.setState({userid: result});
                    console.log(`GOT ID:${result}`);
                    session.subscribe(`com.chipchap.session.user.actions:listen:${result}`, this.trackMessageNotify).then(
                        (subscription) => {
                            console.log("subscription to <<listen>> succeded");
                        },
                        (error) => {
                            console.log("received error with subscription to <<listen>>")
                            console.log(error);
                        }
                    );
                },
                (error) => {
                    console.log("GOT AN ERROR! WHILE CALLING: GETMYID");
                    console.log(error);
                }
            );
        }
        connection.onclose = function(session, details) {
            console.log(session, details);
        }
        connection.open();
    }

    toggleChat = (user) => {
        console.log(`TOGGLER >>>>${user.id}`);
        this.setState({userSelect: user.id});
    }

    onStoreClean = (id) => {
        const removeUser = (id) => {
            const messageStorage = this.state.messageStore;
            console.log("BEFORE NEW MESSAGE STORE");
            console.log(messageStorage);
            let newMessageStorage = [];
            for (let i=0; i < messageStorage.length; i++) {
                if (!messageStorage[i][id]) {
                    newMessageStorage.push(messageStorage[i]);
                }
            }
            console.log("NEW MESSAGE STORE");
            console.log(newMessageStorage);
            console.log("END NEW MESSAGE STORE");
            return newMessageStorage;
        }
        const msgStorage = removeUser(id);
        this.setState({messageStore: msgStorage}, ()=> console.log(this.state.messageStore));
    }

    trackMessageNotify = ([message, userid]) => {
        console.log("*****USERID");
        console.log(`THIS>>>>${String(userid)}`);
        console.log(this.state.userSelect);
        if (this.state.userSelect !== userid) {
            let userStore = [];
            // for (let i=0; i<this.state.messageStore.length;i++) {
            //     if (Object.keys(this.state.messageStore[i])[0] === userid) {
            //         userStore = [...this.state.messageStore[i][userid], message[0]];
            //     } 
            // }
            if (this.state.messageStore.length === 0) {
                userStore = [...userStore, {[userid]:[message[0]]}];
            } else {
                for (let i=0; i<this.state.messageStore.length;i++) {
                    if (Object.keys(this.state.messageStore[i])[0] !== userid) {
                        userStore = [...userStore, this.state.messageStore[i]];
                    } else if (Object.keys(this.state.messageStore[i])[0] === userid) {
                        userStore = [...userStore, {[userid]:[...this.state.messageStore[i][userid], message[0]]}]
                    } else {
                        userStore = [...userStore, {[userid]:[message[0]]}];
                    }
                }
            }
            this.setState({messageStore: userStore});
        }
    }

    selectUserChat = (users) => {
        for (let i=0; i < users.length; i++) {
            if (users[i].id === this.state.userSelect) {
                return users[i];
            }
        }
    }

    selectMessageStore() {
        const user = this.selectUserChat(this.state.users);
        console.log("*.*.*.* INSIDE SELECT MESSAGE STORAGE");
        console.log(user);
        const messageStorage = this.state.messageStore;
        for (let i=0; i < messageStorage.length; i++) {
            console.log(messageStorage);
            if (Object.keys(messageStorage[i])[0] === user.id) {
                console.log("??? INSIDE IF STATEMENT");
                console.log(messageStorage[i]);
                return messageStorage[i][user.id];
            }
        }
        return [];
    }

    onSearch = (e) => {
        let value = e.target.value;
        this.setState({filterChat: value});
    }

    render() {
        return (
            <Container>
                <div style={{borderColor: '#E6E5EA'}} className="w-2/6 inline-flex flex-col align-top border-r h-screen">
                    {/******** BUTTON NEW CONVERSATION *****/}
                    <div className="py-6 text-center">
                        <NewChat onClick={(e) => alert('For demonstration purposes, you can chat though')} />
                    </div>
                    {/******** CHATS & SEARCH *****/}
                    <div className="py-2">
                        <ChatHead onSearch={this.onSearch} />
                    </div>
                    {/******** CONTACTS SECTION *****/}
                    <div className="py-2 overflow-y-scroll">
                        <Contacts filter={this.state.filterChat} users={this.state.users} onToggleChat={this.toggleChat} user={this.state.userSelect} trackNotify={this.state.messageStore} />
                    </div>
                </div>
                <div className="w-4/6 inline-flex flex-col">
                    {/*****  CHAT  *****/}
                    {
                        this.state.userSelect ? (
                            <Chat onMessageStoreClean={this.onStoreClean} myid={this.state.userid} user={this.selectUserChat(this.state.users)} session={this.sess} messageNotify={this.selectMessageStore()} />
                        ) : (
                            <div className="w-full justify-center items-center flex py-64">
                                <h3 style={{color: '#BFBEC5'}} className="cursor-default font-semibold text-4xl tracking-tight">Open a Chat</h3>
                                <svg style={{color: '#BFBEC5'}} className="h-24 w-24 fill-current" version="1.1" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" ><g id="Layer_1"/><g id="chat_x5F_alt_x5F_stroke"><g><g><path d="M25.977,12.213c-0.027,1.387-0.336,2.695-0.883,3.889C27.977,16.582,28,18.93,28,20     c0,0.992,0,4-3.996,4H20c-2.605,0-4.938,1.258-6.398,3.203C12.633,26.469,12,25.305,12,24v-4c0-0.791,0.141-1.414,0.359-1.928     C12.242,18.051,12.125,18,12,18H8.203c-0.129,0.619-0.199,1.281-0.199,2v4c0,4.418,3.578,8,7.996,8c0-2.211,1.789-4,4-4h4.004     C28,28,32,25.75,32,20C32,15.107,29.219,12.84,25.977,12.213z"/></g><path d="M16,4c1.492,0,4,0.52,4,4v4c0,1.309-0.633,2.471-1.602,3.201C16.938,13.26,14.609,12,12,12H8.004    C4,12,4,8.99,4,8c0-1.195,0-4,4.004-4H16 M16,0H8.004C4,0,0,2.125,0,8c0,5.75,4,8,8.004,8H12c2.211,0,4,1.793,4,4    c4.418,0,8.004-3.582,8.004-8V8C24.004,2.479,20,0,16,0L16,0z" /></g></g></svg>
                            </div>
                        )
                    }
                </div>
            </Container>
        );
    }
}

export default App;