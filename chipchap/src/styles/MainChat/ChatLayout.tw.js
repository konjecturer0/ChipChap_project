import styled from 'styled-components';
import tw from 'twin.macro';

const ChatLayout = styled.div`
    ${tw`overflow-y-scroll`}
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    height: 75vh;
    &::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }
`;

export default ChatLayout;