import React from 'react';
import { PopUpContentWrapper } from '../../UI/pop-up-content-wrapper';
import { PopUpTitle, IPopUpStyles } from '../../UI/pop-up';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { ITitle } from '../tutorial-slider';
import { MTSSans } from '../../fonts';
import { useStore } from 'effector-react';
import { UserMarketStore } from '../../effector/coupons/store';

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
`;

const CancelButton = styled.div<ITitle>`
  font-size: 16px;
  line-height: 20px;
  font-family:${MTSSans.BOLD};
  color: #02adc9;
  width: 200px;
  text-align: center;
  margin-right: 14px;
  cursor: pointer;
  :after {
    content:"${props => props.content}";
  }
`;

const ModalPopUpTitle = styled(PopUpTitle)`
  font-size: 36px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #212527;
  text-align: left;
  font-family: ${MTSSans.BOLD};
`;

const CouponBlock = styled.div`
  display: flex;
  align-items: center;
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
  const { userCoupons } = useStore(UserMarketStore);

  return (
    <>
      <PopUpContentWrapper displayFlag={displayFlag} {...popUpStyles}>
        <ModalPopUpTitle>{title}</ModalPopUpTitle>
        {minorText && <MinorText>{minorText}</MinorText>}
        <CouponBlock>{/* <CouponCard active={true} /> */}</CouponBlock>
        <ButtonWrapper>
          <CancelButton onClick={cancelHandler} content={cancelButtonText} />
          <Button
            className={ButtonClassNames.NORMAL}
            content={submitButtonText}
            callback={submitHandler}
          />
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
