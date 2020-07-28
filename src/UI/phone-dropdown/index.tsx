import React, { useState } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import arrowImg from './arrow.svg';
import { Options } from './options';

const PhoneDropdownWrapper = styled.div`
  display: block;
`;

const Arrow = styled.img.attrs({ src: arrowImg, alt: 'arrow' })`
  position: relative;
  bottom: 2px;
  left: 2px;
`;

const PhoneNumberWrapper = styled.div`
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #001424;
  opacity: 0.4;
  cursor: pointer;
`;

const PhoneDropdown: React.FC<IPhoneDropdown> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const { phone } = props;
  return (
    <PhoneDropdownWrapper>
      <PhoneNumberWrapper onClick={() => setShowOptions(!showOptions)}>
        {phone} <Arrow />
      </PhoneNumberWrapper>
      <Options showOptions={showOptions}>asdf asdf</Options>
    </PhoneDropdownWrapper>
  );
};

export default PhoneDropdown;

interface IPhoneDropdown {
  phone: string;
}
