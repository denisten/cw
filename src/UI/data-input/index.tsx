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

const inputSpaceForOneLetter = 12;

const InputWrapper = styled.input<InputWrapperProps>`
  width: ${props => props.value.length * inputSpaceForOneLetter}px;
  min-width: 100px;
  border: none;
  outline: none;
  color: #1b4f75;
  font-size: 1.4em;
  background-color: inherit;
  cursor: default;
`;

const TitleWrapper = styled.span`
  font-size: 1.4em;
  color: #1b4f75;
  font-weight: bold;
  padding: 0;
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
};

interface DataInputProps extends DataInputWrapperProps {
  value: string;
  callBack: (name: string) => void;
  title: string;
}

const StyledConfig = {
  pen: {
    cursor: 'pointer',
  },
};

export const DataInput: React.FC<DataInputProps> = ({
  value,
  callBack,
  title,
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
      </div>
    </DataInputWrapper>
  );
};
