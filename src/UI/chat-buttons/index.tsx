import React from 'react';
import styled from 'styled-components';
import { IAction } from '../../api/tasks/session';
import { Coupon } from '../coupon';
import { IDisplayFlag } from '../../components/skip-tutorial';

const ButtonBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 30px;
`;

const Button = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #bbc1c7;
  background-color: #04b5d2;
  padding: 4px 16px;
  margin: 0 12px 12px 0;
  color: white;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 3px 6px 0 #bbc1c7;
  }
`;

const ChatCouponButton = styled.div<IDisplayFlag>`
  width: 210px;
  height: 28px;
  background: #04b5d2;
  box-shadow: 0px 1px 3px #bbc1c7;
  border-radius: 4px;
  position: relative;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 20px;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 3px 6px 0 #bbc1c7;
  }
`;

const styleConfig = {
  coupon: {
    width: '38px',
    position: 'absolute',
    left: '-20px',
    top: '-5px',
  } as React.CSSProperties,
};

export const ChatButtons: React.FC<IChatButtons> = ({
  actions,
  callback,
  haveCoupon = false,
  couponCount = 0,
  useCouponCallback,
}) => {
  return (
    <ButtonBody>
      {actions &&
        actions.map(el => (
          <Button key={el.id} onClick={() => callback(el.id)}>
            {el.text}
          </Button>
        ))}
      <ChatCouponButton displayFlag={haveCoupon} onClick={useCouponCallback}>
        <Coupon
          couponsCount={couponCount}
          isAllowedToChange={true}
          style={styleConfig.coupon}
        />
        Использовать купон
      </ChatCouponButton>
    </ButtonBody>
  );
};

interface IChatButtons {
  actions: IAction[];
  callback: (id: number) => void;
  haveCoupon: boolean;
  couponCount: number;
  useCouponCallback?: () => void;
}
