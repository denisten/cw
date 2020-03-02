import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import penImg from './pen.png';
const DataInputWrapper = styled.div<DataInputWrapperProps>`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin: ${props => props.margin};
`;

const inputWrapperMinWidthCoefficient = 6;
const inputDefaultFontSize = 1.4;
const extraWidthPerLetter = 13;

const InputWrapper = styled.input.attrs(({ value }: InputWrapperProps) => {
  if (value)
    return {
      style: { width: value.toString().length * extraWidthPerLetter + 'px' },
    };
})<InputWrapperProps>`
  min-width: ${window.innerWidth / inputWrapperMinWidthCoefficient + 'px'};
  border: none;
  outline: none;
  color: ${props => props.color || '#1b4f75'};
  font-size: ${props => props.fontSize || inputDefaultFontSize}em;
  cursor: default;
  font-weight: ${props => props.fontWeight || 'bold'};
  max-width: 250px;
  height: 40px;
  border-radius: 6px;
  background-color: ${props => props.disabled ? 'inherit': '#dee3e9'};
  padding-left: 20px;
`;

const TitleWrapper = styled.span`
  font-size: 1.4em;
  color: #1b4f75;
  font-weight: bold;
  padding-left: 20px;
`;


type DataInputWrapperProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  padding?: string;
  margin?: string;
};

type InputWrapperProps = {
  value: string;
  extendFlag?: boolean;
  minWidth?: number;
  fontWeight?: string;
  fontSize?: number | string;
  heigth?: string;
  color?: string;

};

interface DataInputProps extends DataInputWrapperProps {
  value: string;
  callBack: (name: string) => void;
  title: string;
  minWidth?: number;
  fontWeight?: string;
  fontSize?: number | string;
  editMode?: boolean;
  color?: string;
}

export const DataInput: React.FC<DataInputProps> = ({
  value,
  callBack,
  title,
  fontWeight,
  fontSize,
  minWidth,
  editMode,
  color,

  ...styledProps
}) => {
  const [content, setContent] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlurHandler = () => {
    callBack(content);
  };
  const onClickHandler = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };
  return (
    <DataInputWrapper {...styledProps}>
      <TitleWrapper>{title}</TitleWrapper>
      <div>
        <InputWrapper
          type="text"
          ref={inputRef}
          value={content}
          disabled={!editMode}
          minWidth={minWidth}
          fontWeight={fontWeight}
          fontSize={fontSize}
          color={color}
          onChange={e => {
            setContent(e.target.value);
          }}
          onBlur={onBlurHandler}
        />
      </div>
    </DataInputWrapper>
  );
};
