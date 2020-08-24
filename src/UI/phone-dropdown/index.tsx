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
  const [optionsDisplayFlag, setOptionsDisplayFlag] = useState(false);
  const hideOptions = () => optionsDisplayFlag && setOptionsDisplayFlag(false);
  const showOptions = () => !optionsDisplayFlag && setOptionsDisplayFlag(true);
  const splittedNumberString =
    phone &&
    Array.from(phone)
      .reduce((acc: string[], elem, index) => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (index === 3 || index === 6 || index === 8) {
          acc.push('-');
        }
        acc.push(elem);
        return acc;
      }, [])
      .join('');
  return (
    <div>
      <PhoneNumberWrapper onClick={showOptions}>
        +7-{splittedNumberString} <Arrow />
      </PhoneNumberWrapper>
      <Options showOptions={optionsDisplayFlag} callback={hideOptions} />
    </div>
  );
};

export default PhoneDropdown;

interface IPhoneDropdown {
  phone: string | null;
}
