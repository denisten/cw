import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import { StyledSpan } from '../span';

const defaultWidth = 273,
  defaultHeight = 44;

const Form = styled.form<IFormInput>`
  border-radius: 4px;
  border: solid 2px rgba(2, 173, 201, 0.2);
  padding-left: ${props => props.formPadding}px;
  box-sizing: border-box;
  width: ${props => props.width || defaultWidth}px;
  height: ${props => props.height || defaultHeight}px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: ${props => props.background};
  :focus-within {
    border: solid 2px #02adc9;
  }
  &.error:focus-within,
  &.error {
    border: solid 2px #ea1f49;
  }
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

const HintWrapper = styled(StyledSpan)`
  font-family: ${MTSSans.REGULAR};
  font-size: 12px;
  line-height: 1.33;
  color: #ea1f49;
  margin-top: 4px;
  position: absolute;
`;

export const Input: React.FC<IInput> = ({
  style,
  onChangeHandler,
  value,
  onSubmitHandler,
  hasError = false,
  hint,
  formPadding,
}) => {
  return (
    <div>
      <Form
        formPadding={formPadding}
        onSubmit={onSubmitHandler}
        style={style}
        className={hasError ? 'error' : ''}
      >
        <InputWrapper
          value={value}
          onChange={onChangeHandler}
          placeholder="Заполните поле"
        />
      </Form>

      <HintWrapper>{hasError && hint}</HintWrapper>
    </div>
  );
};

interface IInput {
  style?: React.CSSProperties;
  title?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onSubmitHandler: (e: React.FormEvent) => void;
  hasError?: boolean;
  hint?: string;
  formPadding?: number;
}

interface IFormInput {
  formPadding?: number;
  title?: string;
  width?: number;
  height?: number;
  background?: string;
}
