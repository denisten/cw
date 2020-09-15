/* eslint-disable @typescript-eslint/no-magic-numbers */
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

const indexes = [3, 6, 8];
const PhoneDropdown: React.FC<IPhoneDropdown> = ({ phone }) => {
  const [optionsDisplayFlag, setOptionsDisplayFlag] = useState(false);
  const hideOptions = () => optionsDisplayFlag && setOptionsDisplayFlag(false);
  const showOptions = () => !optionsDisplayFlag && setOptionsDisplayFlag(true);
  const splitNumberString =
    phone &&
    Array.from(phone)
      .reduce((acc: string[], elem, index) => {
        if (indexes.find(indexElem => indexElem === index)) {
          acc.push('-');
        }
        acc.push(elem);
        return acc;
      }, [])
      .join('');
  return (
    <div>
      <PhoneNumberWrapper onClick={showOptions}>
        +7-{splitNumberString} <Arrow />
      </PhoneNumberWrapper>
      <Options showOptions={optionsDisplayFlag} callback={hideOptions} />
    </div>
  );
};

export default PhoneDropdown;

interface IPhoneDropdown {
  phone: string | null;
}
