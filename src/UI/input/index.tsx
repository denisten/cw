import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import { StyledSpan } from '../span';

const formWidthWithTitle = 314,
  formWidthWithoutTitle = 299,
  formHeightWithTitle = 72,
  formHeightWithoutTitle = 52;

const Form = styled.form<IFormInput>`
  border-radius: 4px;
  border: solid 2px #02adc9;
  padding: ${props => (props.title ? '16px 0 0 20px' : '14px 0 14px 16px')};
  box-sizing: border-box;
  width: ${props =>
    props.title ? formWidthWithTitle : formWidthWithoutTitle}px;
  height: ${props =>
    props.title ? formHeightWithTitle : formHeightWithoutTitle}px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.input`
  height: 24px;
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
  ::placeholder {
    color: #9198a0;
  }
`;

const InputTitle = styled(StyledSpan)`
  font-family: ${MTSSans.REGULAR};
  font-size: 14px;
  color: #02adc9;
  height: 20px;
`;

export const Input: React.FC<IInput> = ({
  style,
  title = '',
  onChangeHandler,
  value,
  onSubmitHandler,
}) => {
  return (
    <Form title={title} onSubmit={onSubmitHandler} style={style}>
      <InputTitle>{title}</InputTitle>
      <InputWrapper
        value={value}
        onChange={onChangeHandler}
        placeholder="Заполните поле"
      />
    </Form>
  );
};

interface IInput {
  style?: React.CSSProperties;
  title?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onSubmitHandler: (e: React.FormEvent) => void;
}

interface IFormInput {
  title?: string;
}
