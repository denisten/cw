import React from 'react';
import { PopUpContentWrapper } from '../../UI/pop-up-content-wrapper';
import { PopUpTitle, IPopUpStyles } from '../../UI/pop-up';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { ITitle } from '../tutorial-slider';

const MinorText = styled.span`
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #979797;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
`;

const CancelButton = styled.div<ITitle>`
  font-size: 14px;
  line-height: 20px;
  color: #02adc9;
  cursor: pointer;
  :after {
    content:"${props => props.content}";
  }
`;

export const ModalWindow: React.FC<IModalWindow> = ({
  title,
  minorText,
  popUpStyles,
  submitButtonText,
  cancelButtonText = '',
  submitHandler,
  cancelHandler,
  displayFlag,
}) => {
  return (
    <>
      <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
        <PopUpTitle>{title}</PopUpTitle>
        {minorText && <MinorText>{minorText}</MinorText>}
        <ButtonWrapper>
          <Button
            className={ButtonClassNames.NORMAL}
            content={submitButtonText}
            callback={submitHandler}
          />
          <CancelButton onClick={cancelHandler} content={cancelButtonText} />
        </ButtonWrapper>
      </PopUpContentWrapper>
    </>
  );
};

interface IModalWindow {
  title: string;
  minorText?: string;
  popUpStyles?: IPopUpStyles;
  submitButtonText: string;
  cancelButtonText?: string;
  submitHandler?: () => void;
  cancelHandler?: () => void;
  displayFlag: boolean;
  style?: React.CSSProperties;
}
