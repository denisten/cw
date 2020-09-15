import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';
import { StyledSpan } from '../span';

export const defaultWidth = 273,
  defaultHeight = 44,
  defaultOptionHeight = 46,
  defaultInputWrapperPadding = '0 0 0 15px';

export const Form = styled.form<IFormInput>`
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

const InputWrapper = styled.input<IInputWrapper>`
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
  ::placeholder {
    color: #9198a0;
  }
`;

const HintWrapper = styled(StyledSpan)<IHintWrapper>`
  font-family: ${MTSSans.REGULAR};
  font-size: 12px;
  line-height: 1.33;
  color: ${props => (props.hasError ? '#ea1f49' : '#9198A0')};
  margin-top: 4px;
  margin-left: 3px;
  position: absolute;
`;

export const Input: React.FC<IInput> = ({
  height = defaultOptionHeight,
  style,
  onChangeHandler,
  value,
  onSubmitHandler,
  hasError = false,
  hint,
  formPadding,
  describer,
  placeholder = 'Заполните поле',
  inputWrapperPadding = defaultInputWrapperPadding,
}) => {
  return (
    <div>
      <Form
        height={height}
        formPadding={formPadding}
        onSubmit={onSubmitHandler}
        style={style}
        className={hasError ? 'error' : ''}
      >
        <InputWrapper
          inputWrapperPadding={inputWrapperPadding}
          value={value}
          height={height}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
      </Form>

      <HintWrapper hasError={hasError}>
        {(hasError && hint) || describer}
      </HintWrapper>
    </div>
  );
};

export interface IInput {
  height?: number;
  style?: React.CSSProperties;
  title?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onSubmitHandler: (e: React.FormEvent) => void;
  hasError?: boolean;
  hint?: string;
  formPadding?: number;
  describer?: string;
  placeholder?: string;
  inputWrapperPadding?: string;
}

interface IFormInput {
  formPadding?: number;
  title?: string;
  width?: number;
  height?: number;
  background?: string;
}

interface IHintWrapper {
  hasError: boolean;
}

interface IInputWrapper {
  inputWrapperPadding?: string;
  height: number;
}
