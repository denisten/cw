import React from 'react';
import { TasksRow } from '../../tasks-row';
import styled from 'styled-components';
import { AdvancedScrollbar } from '../../../../UI/advanced-scrollbar';
import { AdvanceScrollBarAttr } from '../../../../utils/handle-scroll';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../effector/missions-store/store';
import { UserDataStore } from '../../../../effector/user-data/store';

const TaskWrapper = styled(AdvancedScrollbar)<ITask>`
  display: ${props => (props.hidden ? 'hidden' : 'block')};
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Task: React.FC<{ active: boolean }> = ({ active }) => {
  const missions = useStore(MissionsStore);
  const { couponsCount } = useStore(UserDataStore);
  return (
    <TaskWrapper
      hidden={!active}
      data-type={AdvanceScrollBarAttr.ADVANCE_SCROLLBAR}
    >
      {missions.map(el => {
        return (
          <TasksRow
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
    </TaskWrapper>
  );
};

interface ITask {
  hidden: boolean;
}
