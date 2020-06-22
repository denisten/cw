import React from 'react';
import {
  defaultInputWrapperPadding,
  defaultOptionHeight,
  Form,
} from '../input';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';

const MultipleInputWrapper = styled.textarea<IInputWrapper>`
  height: ${props => props.height}px;
  outline: none;
  border: none;
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  box-sizing: border-box;
  padding: ${props => props.inputWrapperPadding};
  margin-top: 10px;
  ::placeholder {
    color: #9198a0;
  }
`;

export const MultipleInput: React.FC<IMultipleInput> = ({
  height = defaultOptionHeight,
  style,
  onChangeHandler,
  value,
  hasError = false,
  formPadding,
  placeholder = 'Заполните поле',
  inputWrapperPadding = defaultInputWrapperPadding,
}) => {
  return (
    <div>
      <Form
        height={height}
        formPadding={formPadding}
        style={style}
        className={hasError ? 'error' : ''}
      >
        <MultipleInputWrapper
          inputWrapperPadding={inputWrapperPadding}
          value={value}
          height={height}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
      </Form>
    </div>
  );
};

interface IMultipleInput {
  height?: number;
  style?: React.CSSProperties;
  title?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  hasError?: boolean;
  hint?: string;
  formPadding?: number;
  describer?: string;
  placeholder?: string;
  inputWrapperPadding?: string;
}

interface IInputWrapper {
  inputWrapperPadding?: string;
  height: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
