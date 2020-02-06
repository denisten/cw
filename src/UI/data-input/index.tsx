import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import penImg from './pen.png';
const DataInputWrapper = styled.div<DataInputWrapperProps>`
  width: auto;
  height: 17%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: ${props => props.top}%;
  bottom: ${props => props.bottom}%;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
`;

const inputSpaceForOneLetter = 12;

const InputWrapper = styled.input<InputWrapperProps>`
  width: ${props => props.value.length * inputSpaceForOneLetter}px;
  min-width: 100px;
  height: 50px;
  border: none;
  outline: none;
  color: #1b4f75;
  font-size: 1.4em;
  background-color: inherit;
  cursor: default;
`;

type DataInputWrapperProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type InputWrapperProps = {
  value: string;
};

type DataInputProps = {
  value: string;
};

const StyledConfig = {
  pen: {
    cursor: 'pointer',
  },
};

export const DataInput: React.FC<DataInputProps> = ({ value }) => {
  const [editMode, setEditMode] = useState(true);
  const [content, setContent] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlurHandler = () => setEditMode(true);
  const onClickHandler = () => {
    setEditMode(!editMode);
    if (inputRef) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      setTimeout(() => inputRef.current.focus());
    }
  };
  return (
    <DataInputWrapper>
      <InputWrapper
        ref={inputRef}
        value={content}
        type="text"
        disabled={editMode}
        onChange={e => {
          setContent(e.target.value);
        }}
        onBlur={onBlurHandler}
      />
      <img
        src={penImg}
        alt="pen"
        onClick={onClickHandler}
        style={{ ...StyledConfig.pen }}
      />
    </DataInputWrapper>
  );
};
