import React from 'react';
import {
    MessageInputWrapper,
    MessageBox,
    MessageDoc,
    MessageInput,
    MessageEmoji,
    MessageSend
} from '../../styles/MainChat/EnterMessage';

const EnterMessage = ({onmessage, onenter, clean}) => {
    return (
        <MessageInputWrapper>
            <MessageBox>
                <MessageDoc><span className="docBox"><svg className="plus" id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288 "/></svg></span></MessageDoc>
                <MessageInput><input ref={clean} onKeyDown={onenter} onChange={onmessage} placeholder="Type a message here" /></MessageInput>
                <MessageEmoji><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg></MessageEmoji>
                <MessageSend onClick={() => onenter('button_send')}><span className="boxSend"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z"/></svg></span></MessageSend>
            </MessageBox>
        </MessageInputWrapper>
    );
}

export default EnterMessage;