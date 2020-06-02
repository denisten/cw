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
            expireInSeconds={el.expireInSeconds}
            id={el.id}
            isInTowerInfo={false}
            isAllowedToChange={true}
            couponsCount={couponsCount}
            type={TaskSubType.NBO}
            taskTitle={`${el.task.content.name.slice(0, maxTaskLength)}...`}
            key={el.task.id}
            status={el.status}
            money={el.task.reward}
            energy={el.task.energy}
            description={el.task.content.description}
          />
        );
      })}
    </TasksWrapper>
  );
};

interface ITask {
  hidden: boolean;
}
