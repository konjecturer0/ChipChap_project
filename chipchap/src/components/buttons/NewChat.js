import React from 'react';
import {NewChatLayout, AddButton} from '../../styles/buttons/NewChat.tw';

const SvgButton = () => {
    return (
        <svg className="fill-current h-4 w-4 text-blue-700" id="Layer_1" style={{enableBackground: 'new 0 0 32 32'}} version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" ><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"></path></svg>
    );
}

const NewChat = ({onClick}) => {
    return (
        <NewChatLayout type="text">
            New Conversation
            <AddButton onClick={onClick}>
                <SvgButton/>
            </AddButton>
        </NewChatLayout>
    );
}

export default NewChat;