import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import penImg from './pen.png';
const DataInputWrapper = styled.div<DataInputWrapperProps>`
  width: auto;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
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
  color: #1b4f75;
  font-size: ${props => props.fontSize || inputDefaultFontSize}em;
  background-color: inherit;
  cursor: default;
  font-weight: ${props => props.fontWeight || 'bold'};
`;

const TitleWrapper = styled.span`
  font-size: 1.4em;
  color: #1b4f75;
  font-weight: bold;
  padding: 0;
`;

const PenImgWrapper = styled.img`
  cursor: pointer;
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
  fontSize?: number;
};

interface DataInputProps extends DataInputWrapperProps {
  value: string;
  callBack: (name: string) => void;
  title: string;
  minWidth?: number;
  fontWeight?: string;
  fontSize?: number;
}

export const DataInput: React.FC<DataInputProps> = ({
  value,
  callBack,
  title,
  fontWeight,
  fontSize,
  minWidth,
  ...styledProps
}) => {
  const [editMode, setEditMode] = useState(true);
  const [content, setContent] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlurHandler = () => {
    setEditMode(true);
    callBack(content);
  };
  const onClickHandler = () => {
    setEditMode(!editMode);
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
          disabled={editMode}
          minWidth={minWidth}
          fontWeight={fontWeight}
          fontSize={fontSize}
          onChange={e => {
            setContent(e.target.value);
          }}
          onBlur={onBlurHandler}
        />
        <PenImgWrapper src={penImg} alt="pen" onClick={onClickHandler} />
      </div>
    </DataInputWrapper>
  );
};
