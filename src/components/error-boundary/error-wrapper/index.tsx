import React from 'react';
import { Overlay } from '../../../UI/overlay';
import styled from 'styled-components';
import background from './background.png';
const ErrorBody = styled.div`
  width: 617px;
  height: 683px;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 174px 0 104px 0;
  box-sizing: border-box;
`;

const ErrorText = styled.span`
  color: #146977;
  font-size: 30.5px;
  font-weight: bold;
  max-width: 503px;
  height: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const ErrorWrapper: React.FC<IErrorWrapper> = ({
  errorFlag,
  text,
  children,
  ...props
}) => {
  return (
    <Overlay displayFlag={errorFlag} {...props}>
      <ErrorBody>
        <ErrorText>{text}</ErrorText>
        {children}
      </ErrorBody>
    </Overlay>
  );
};

interface IErrorWrapper {
  errorFlag?: boolean;
  text?: string;
}
