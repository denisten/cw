import React from 'react';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../../effector/missions-store/store';
import { TasksWrapper } from '../task';
import { MissionMenuRowView } from '../../../../missions-view';
import noMissionImg from './no-mission.svg';
import title from './title.svg';
import description from './desctiption.svg';
import styled from 'styled-components';

const CapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const TitleCap = styled.img.attrs({ src: title, alt: 'title' })`
  margin-top: 15px;
`;
const NoMissionImgCap = styled.img.attrs({
  src: noMissionImg,
  alt: 'noMissionImg',
})``;

const DescriptionCap = styled.img.attrs({
  src: description,
  alt: 'description',
})`
  margin-top: 5px;
`;

const Cap = () => (
  <CapWrapper>
    <NoMissionImgCap />
    <TitleCap />
    <DescriptionCap />
  </CapWrapper>
);

export const Mission: React.FC<IMission> = ({ active }) => {
  const missions = useStore(MissionsStore);

  return (
    <TasksWrapper hidden={!active}>
      {missions.length ? (
        missions.map(el => <MissionMenuRowView taskData={el} key={el.id} />)
      ) : (
        <Cap />
      )}
    </TasksWrapper>
  );
};

interface IMission {
  active: boolean;
}
