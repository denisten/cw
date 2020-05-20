import React from 'react';
import { Task } from '../../tasks-row';
import styled from 'styled-components';
import { AdvancedScrollbar } from '../../../../UI/advanced-scrollbar';
import { AdvanceScrollBarAttr } from '../../../../utils/handle-scroll';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../effector/missions-store/store';
import { UserDataStore } from '../../../../effector/user-data/store';

const TasksWrapper = styled(AdvancedScrollbar)<ITask>`
  display: ${props => (props.hidden ? 'hidden' : 'block')};
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

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
            isAllowedToChange={el.isAllowedToChange}
            couponsCount={couponsCount}
            type={el.type}
            taskTitle={el.taskTitle}
            key={el.taskTitle}
            status={el.status}
            money={el.loot.money}
            energy={el.loot.energy}
            description={el.description}
          />
        );
      })}
    </TasksWrapper>
  );
};

interface ITask {
  hidden: boolean;
}
