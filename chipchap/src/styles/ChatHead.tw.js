
import styled from 'styled-components';
import tw, {css} from 'twin.macro';
import React from 'react';

export const ChatHeadLayout = styled.div`
    ${tw`mx-auto`}
    width: 14rem;
    & .ChatHeadLayout_wrapper {
        ${tw`mt-4 relative`}
        & .ChatHeadLayout_wrapper_icon {
            ${tw`absolute inset-y-0 right-0 flex px-2 -mt-1 items-center`}
        }
    }
`;

export const ChatTextLayout = styled.h3`
    ${tw`flex items-center relative text-3xl font-bold tracking-tight`}
`;

export const ChatSvgLayout = () => <svg type="button" css={[css`color: #BFBEC5;`]} tw="inline-block cursor-pointer absolute right-0 h-6 w-6 fill-current" enableBackground="new 0 0 48 48" height="48px" id="Layer_3" version="1.1" viewBox="0 0 48 48" width="48px" xmlns="http://www.w3.org/2000/svg"><g><circle cx="5.5" cy="24" r="5.5"/><circle cx="42.499" cy="24" r="5.5"/><circle cx="24" cy="24" r="5.5"/></g></svg>

export const SearchButton = styled.input`
    ${tw`px-5 py-2 appearance-none bg-gray-300 outline-none focus:outline-none`}
    background-color: #E7E6EB;
    &::placeholder {
        color: #A3A2A7;
    }
`;

export const SearchButtonWrapper = styled.span`
    ${tw`w-full overflow-hidden rounded-md`}
    background-color: #E7E6EB;
    position: relative;
    display: inline-block;
`;

export const SearchSvgIcon = () => <svg css={[css`color: #E7E6EB;`]} tw="h-4 w-4 opacity-75 fill-current" stroke="#36353A" strokeWidth="4" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="18" x2="30" y1="18" y2="30"/></svg>

