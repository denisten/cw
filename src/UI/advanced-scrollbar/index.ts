import styled from 'styled-components';

export const AdvancedScrollbar = styled.div`
  &.on-scrollbar {
    scrollbar-width: thin; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  &.on-scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow: none !important;
    background-color: transparent !important;
  }

  &.on-scrollbar::-webkit-scrollbar {
    width: 6px !important;
    background-color: transparent;
  }

  &.on-scrollbar::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:active {
    background-color: #acacac;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: none !important;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 3px !important;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;
