import React from 'react';
import {
    ChatHeadLayout, ChatTextLayout, ChatSvgLayout, SearchButton, SearchButtonWrapper, SearchSvgIcon
} from '../styles/ChatHead.tw';

const ChatHead = ({onSearch}) => {
    return (
        <ChatHeadLayout>
            <ChatTextLayout>Chats<ChatSvgLayout/></ChatTextLayout>
            <div className="ChatHeadLayout_wrapper">
                <SearchButtonWrapper><SearchButton onChange={onSearch} placeholder="Search here"/></SearchButtonWrapper>
                <div className="ChatHeadLayout_wrapper_icon">
                    <SearchSvgIcon/>
                </div>
            </div>
        </ChatHeadLayout>
    );
}

export default ChatHead;