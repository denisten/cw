import React from 'react';
import { Task } from '../../tasks-row';
import styled from 'styled-components';
import { AdvancedScrollbar } from '../../../../UI/advanced-scrollbar';
import { AdvanceScrollBarAttr } from '../../../../utils/handle-scroll';
import { useStore } from 'effector-react';
import {
  MissionsStore,
  TaskSubType,
} from '../../../../effector/missions-store/store';
import { UserDataStore } from '../../../../effector/user-data/store';

const TasksWrapper = styled(AdvancedScrollbar)<ITask>`
  display: ${props => (props.hidden ? 'hidden' : 'block')};
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const maxTaskLength = 32;

export const Tasks: React.FC<{ active: boolean }> = ({ active }) => {
  const missions = useStore(MissionsStore);
  const { couponsCount } = useStore(UserDataStore);
  return (
    <TasksWrapper
      hidden={!active}
      data-type={AdvanceScrollBarAttr.ADVANCE_SCROLLBAR}
    >
      {missions.map(el => {
        return (
          <Task
            isInTowerInfo={false}
            isAllowedToChange={true}
            couponsCount={couponsCount}
            type={TaskSubType.NBO}
            taskTitle={`${el.content.name.slice(0, maxTaskLength)}...`}
            key={el.content.name}
            status={el.status}
            money={el.reward}
            energy={el.energy}
            description={el.content.description}
          />
        );
      })}
    </TasksWrapper>
  );
};

interface ITask {
  hidden: boolean;
}
