import styled from 'styled-components';
import tw from 'twin.macro';

export const MessageInputWrapper = styled.div`${tw`py-4 text-center`}`;

export const MessageBox = styled.div`
    ${tw`rounded inline-flex justify-center items-center px-12 shadow-lg`}
    background-color: white;
`;

export const MessageDoc = styled.span`
    ${tw`px-4 flex -ml-12`}
    & .docBox {
        ${tw`cursor-pointer bg-blue-500 rounded bg-opacity-25 relative flex items-center justify-center`}
        height: 25px;
        width: 25px;
        & .plus {
            ${tw`fill-current text-blue-600 h-4 w-4`}
        }
    }
`;

export const MessageInput = styled.span`
    ${tw`py-4 w-64 flex-auto`}
    width: 24rem;
    & input {
        ${tw`focus:outline-none outline-none w-full`}
    }
`;

export const MessageEmoji = styled.span`
    & svg {
        ${tw`cursor-pointer fill-current text-gray-600 h-5 w-5`}
    }
`;

export const MessageSend = styled.span`
    ${tw`pl-4 ml-2 -mr-6`}
    & .boxSend {
        ${tw`cursor-pointer bg-blue-600 rounded relative flex items-center justify-center`}
        height: 32px;
        width: 32px;
        & svg {
            ${tw`fill-current text-white h-4 w-4`}
        }
    }
`;

