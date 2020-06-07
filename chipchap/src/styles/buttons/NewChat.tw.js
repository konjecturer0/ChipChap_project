import tw from 'twin.macro';
import styled from 'styled-components';


export const NewChatLayout = styled.div`
    ${tw`bg-gray-100 shadow-lg outline-none focus:outline-none rounded-md px-5 pl-16 font-semibold py-2 inline-block relative`}
    top: 50%;
    transform: translateY(-50%);
    cursor: default;
    & button { 
        border-color: #E6E5EA;
        &:focus {
            z-index: 2;
            outline: none;
            box-shadow: 0 0 0 2px rgba(49, 130, 206, .2);
        }
    }
`;

export const AddButton = styled.button`
    ${tw`absolute inset-y-0 left-0 flex items-center px-3 border-r`}
`;