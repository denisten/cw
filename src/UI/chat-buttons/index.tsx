import React from 'react';
import styled from 'styled-components';

const ButtonBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-shrink: 0;
`;

const Button = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #bbc1c7;
  background-color: #04b5d2;
  padding: 4px 16px;
  margin: 0 12px 12px 0;
  color: white;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 3px 6px 0 #bbc1c7;
  }
`;

export const ChatButtons: React.FC<IChatButtons> = ({
  buttonsCollection,
  callback,
}) => {
  return (
    <ButtonBody>
      {buttonsCollection.map(button => (
        <Button key={button.answerId} onClick={callback}>
          {button.title}
        </Button>
      ))}
    </ButtonBody>
  );
};

interface IChatButtons {
  buttonsCollection: {
    answerId: number;
    title: string;
  }[];
  callback: () => void;
}
