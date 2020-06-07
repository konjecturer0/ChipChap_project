import styled from 'styled-components';
import tw from 'twin.macro';

export const FocusChat = styled.div`
    width: 18rem;
    ${tw`mx-auto flex items-center transition ease-out duration-100 transform opacity-100 scale-95`}
    &.active {
        border: none !important;
        background-color: #FFFFFF !important;
        ${tw`rounded-md shadow-lg transform opacity-100 scale-100`}
    }
    &.notify {
        border: none !important;
        background-color: #FDFAE5 !important;
        ${tw`rounded-md shadow-lg transform opacity-100 scale-100`}
    }
    &:focus {
        outline: none;
    }
`;

export const UserShowStyled = styled.div`
    ${tw`flex mx-auto border-b py-3`}
    width: 14rem;
    border-color: #E6E5EA;
    cursor: pointer;
    &.active {
        border: 0px solid;
    }
    &.notify {
        border: 0px solid;
    }
    & .UserShowStyled__wraper_img {
        ${tw`relative`}
    }

    & .UserShowStyled__wrapper_info {
        ${tw`inline-block ml-5`}
    }
`;

export const Dot_status = styled.span`
    ${tw`rounded-full inset-x-auto right-0`}
    height: 12px;
    width: 12px;
    display: inline-block;
    background-color: ${props => props.dot_color || "#49C967"};
    position: absolute;
    bottom: 0px;
    border: 2.5px solid white;
`;

export const ImageWrapper = styled.div`
    ${tw`rounded-full align-middle overflow-hidden inline-block flex-none`}
`;

export const FullName = styled.h4`
    ${tw`font-bold text-gray-800 text-left`}
`;

export const LastSeen = styled.p`
    ${tw`text-xs text-gray-500 font-semibold text-left`}
`;

