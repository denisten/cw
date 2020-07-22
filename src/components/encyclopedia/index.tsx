import React, { useState } from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';
import wrapperBg from './wrapperbg.svg';
const StyledConfig = {
  overlay: {
    zIndex: ZIndexes.MODAL,
  },
};

const Wrapper = styled.div`
  background-image: url(${wrapperBg});
  width: 1101px;
  height: 737px;
  display: flex;
`;

const encyclopediaConfig = [
  {
    label: 'Легенда',
    id: 'legend',
    active: true,
  },
  {
    label: 'Подсказки',
    id: 'hints',
    active: false,
  },
  {
    label: 'Задания',
    id: 'tasks',
    active: false,
  },
];
const Encyclopedia = () => {
  const [itemsState, setitemsState] = useState(encyclopediaConfig);
  return (
    <Overlay displayFlag={true} {...StyledConfig.overlay}>
      <Wrapper></Wrapper>
    </Overlay>
  );
};

export default Encyclopedia;
