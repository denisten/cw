import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DataInputWrapper = styled.div<IDataInputWrapper>`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin: ${props => props.margin};
`;

const inputDefaultFontSize = 1.4;

const InputWrapper = styled.input<IInputWrapper>`
  border: none;
  outline: none;
  color: ${props => props.color || '#1b4f75'};
  font-size: ${props => props.fontSize || inputDefaultFontSize}em;
  cursor: default;
  font-weight: ${props => props.fontWeight || 'bold'};
  max-width: 250px;
  height: 40px;
  border-radius: 6px;
  background-color: ${props => (props.disabled ? 'inherit' : '#dee3e9')};
  padding-left: 20px;
`;

const TitleWrapper = styled.span`
  font-size: 1.4em;
  color: #1b4f75;
  font-weight: bold;
  padding-left: 20px;
`;

export const DataInput: React.FC<IDataInput> = ({
  value,
  callBack,
  title,
  fontWeight,
  fontSize,
  editMode,
  color,

  ...styledProps
}) => {
  const [content, setContent] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setContent(value);
  }, [value]);
  const onBlurHandler = () => {
    callBack(content);
  };
  return (
    <DataInputWrapper {...styledProps}>
      <TitleWrapper>{title}</TitleWrapper>
      <div>
        <InputWrapper
          type="text"
          ref={inputRef}
          value={content || ''}
          disabled={!editMode}
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

interface IDataInputWrapper {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  padding?: string;
  margin?: string;
}

interface IInputWrapper {
  extendFlag?: boolean;
  fontWeight?: string;
  fontSize?: number | string;
  color?: string;
}

interface IDataInput extends IDataInputWrapper {
  value: string;
  callBack: (name: string) => void;
  title: string;
  fontWeight?: string;
  fontSize?: number | string;
  editMode?: boolean;
  color?: string;
}
