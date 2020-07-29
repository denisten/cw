import React, { useState } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import arrowImg from './arrow.svg';
import { Options } from './options';

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

const PhoneDropdown: React.FC<IPhoneDropdown> = ({ phone }) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleShowOptions = () => setShowOptions(!showOptions);

  return (
    <div>
      <PhoneNumberWrapper onClick={toggleShowOptions}>
        {phone} <Arrow />
      </PhoneNumberWrapper>
      <Options showOptions={showOptions} callback={toggleShowOptions} />
    </div>
  );
};

export default PhoneDropdown;

interface IPhoneDropdown {
  phone: string;
}
