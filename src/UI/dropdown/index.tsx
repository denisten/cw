import React from 'react';
import styled from 'styled-components';
import arrowDown from './arrow-down.svg';
import { MTSSans } from '../../fonts';

const Select = styled.select`
  appearance: none;
  background-image: url(${arrowDown});
  background-repeat: no-repeat;
  background-position: right;
  width: 109px;
  height: 44px;
  border-radius: 4px;
  border: solid 2px rgba(2, 172, 200, 0.25);
  padding: 9px 0 11px 16px;
  box-sizing: border-box;
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #001424;
`;

export const Dropdown = () => {
  return (
    <form>
      <div className="content">
        <h3 className="title">Описание 0 пункта</h3>
        <input id="selectName0" type="radio" value="0" name="selectName" />
        <label htmlFor="selectName0">Описание 0 пункта</label>
        <input id="selectName1" type="radio" value="1" name="selectName" />
        <label htmlFor="selectName1">Описание 1 пункта</label>
        <input id="selectName2" type="radio" value="2" name="selectName" />
        <label htmlFor="selectName2">Описание 2 пункта</label>
      </div>
    </form>
  );
};
