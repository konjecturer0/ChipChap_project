import React from 'react';
import {
    FocusChat,
    UserShowStyled,
    Dot_status,
    ImageWrapper,
    FullName,
    LastSeen
} from '../styles/Contacts.tw';

class Contacts extends React.Component {

    state = {userSelect: ''};

    componentDidUpdate() {
        if (this.props.user !== this.state.userSelect) {
            this.setState({userSelect: this.props.user});
        }
    }

    updateUsersMap(users) {
        return users.map((user) => {
            return (
                <FocusChat key={user.id} as="button" onClick={this.props.onToggleChat.bind(this, user)} className={this.state.userSelect === user.id ? 'active' : ''}>
                    <UserShowStyled className={this.state.userSelect === user.id ? 'active' : ''}>
                        <div className="UserShowStyled__wraper_img">
                            <ImageWrapper>
                                <img className="h-10 w-10" src={require(`../assets/img/faces/user.jpg`)} />
                            </ImageWrapper>
                            <Dot_status/>
                        </div>

                        <div className="UserShowStyled__wrapper_info">
                            <FullName>{user.name}</FullName>
                            <LastSeen>{user.last_seen}</LastSeen>
                        </div>
                    </UserShowStyled>
                </FocusChat>
            )
        })
    }

    filterUsers() {
        const results = this.props.users.filter((user) => user.name.includes(this.props.filter));
        return this.updateUsersMap(results);
    }

    render() {
        if (this.props.filter) {
            return this.filterUsers();
        }
        return this.props.users.map((user) => {
            return (
                <FocusChat key={user.id} as="button" onClick={this.props.onToggleChat.bind(this, user)} className={this.state.userSelect === user.id ? 'active' : ''}>
                    {/* (this.props.trackNotify[this.props.trackNotify.findIndex(e => e[user.id])] === 0) ? 'notify' : */}
                    <UserShowStyled className={this.state.userSelect === user.id ? 'active' : ''}>
                        <div className="UserShowStyled__wraper_img">
                            <ImageWrapper>
                                <img className="h-10 w-10" src={require(`../assets/img/faces/user.jpg`)} />
                            </ImageWrapper>
                            <Dot_status/>
                        </div>

                        <div className="UserShowStyled__wrapper_info">
                            <FullName>{user.name}</FullName>
                            <LastSeen>{user.last_seen}</LastSeen>
                        </div>
                    </UserShowStyled>
                </FocusChat>
            )
        })
    }
} 

export default Contacts;

