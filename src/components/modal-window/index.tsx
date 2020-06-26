import React from 'react';
import { PopUpContentWrapper } from '../../UI/pop-up-content-wrapper';
import { PopUpTitle, IPopUpStyles } from '../../UI/pop-up';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';

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
  margin-top: 32px;
`;

const CancellButton = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #02adc9;
  cursor: pointer;
`;

export const ModalWindow: React.FC<IModalWindow> = ({
  title,
  minorText,
  popUpStyles,
  submitButtonText,
  cancellButtonText,
  submitHandler,
  cancellHandler,
  displayFlag,
}) => {
  return (
    <>
      <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
        <PopUpTitle>{title}</PopUpTitle>
        {minorText && (
          <MinorText>
            Если вы примените купон, отменить действие будет не возможно.
          </MinorText>
        )}
        <ButtonWrapper>
          <Button
            className={ButtonClassNames.NORMAL}
            content={submitButtonText}
            callback={submitHandler}
          />
          <CancellButton onClick={cancellHandler}>
            {cancellButtonText}
          </CancellButton>
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
  cancellButtonText?: string;
  submitHandler?: () => void;
  cancellHandler?: () => void;
  displayFlag: boolean;
}
