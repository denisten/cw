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

const inputSpaceForOneLetter = 14;
const inputWrapperMinWidth = 100;
const inputDefaultFontSize = 1.4;

const InputWrapper = styled.input<InputWrapperProps>`
  width: ${props => props.value.length * inputSpaceForOneLetter}px;
  min-width: ${props => props.minWidth || inputWrapperMinWidth}px;
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
    if (inputRef) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      setTimeout(() => inputRef.current.focus());
    }
  };
  return (
    <DataInputWrapper {...styledProps}>
      <TitleWrapper>{title}</TitleWrapper>
      <div>
        <InputWrapper
          ref={inputRef}
          value={content}
          type="text"
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
