import React from 'react';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../../../../../UI/button';
import { MenuTaskRow } from '../../../../../tasks-view/menu-task-row';
import { handleAuthButtonClick } from '../../../../../../utils/handle-auth-button-click';
import {
  ITask,
  TaskStatuses,
} from '../../../../../../effector/tasks-store/store';
import { TowersTypes } from '../../../../../../effector/towers-progress/store';

const UnauthorizedTaskZoneWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .${ButtonClassNames.NORMAL} {
    top: 140px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: #001424;
  margin-top: 20px;
  text-align: center;
`;

const LinkTitle = styled(Title)`
  text-decoration-line: underline;
  color: #02adc9;
  cursor: pointer;
`;
enum TasksType {
  TUTORIAL_TASK = 'tutorial-task',
  TASKS = 'tasks',
  CHALLENGE = 'challenge',
  MISSION = 'mission',
  NBO = 'nbo',
  PAID = 'paid',
  TARGET = 'target',
  INFORMATIONAL = 'informational',
  PRODUCT_QUIZ = 'product-quiz',
  RELATED_QUIZ = 'related-quiz',
  COSMETIC = 'cosmetic',
}
const firstTask: ITask = {
  status: TaskStatuses.CREATED,
  expireAt: '1000',
  id: 1,
  expireInSeconds: null,
  task: {
    id: 1,
    parentId: 1,
    content: {
      id: 1,
      taskType: {
        id: 1,
        slug: TasksType.INFORMATIONAL,
        name: 'Войти в мир клиента',
      },
      product: {
        id: 1,
        name: 'string',
        slug: TowersTypes.MAIN_TOWER,
        description: 'string',
      },
      logo: {
        id: 1,
        content: 'string',
      },
      name: 'string',
      legend: 'string',
      description: 'string',
    },
    priorityNumber: 1,
    energy: 0,
    reward: 400,
    availabilityTime: 0,
    executionTime: 0,
    betweenTasksTime: 0,
    chat: '',
  },
  userSubTasks: [],
};

export const UnauthorizedTaskZone = () => {
  return (
    <UnauthorizedTaskZoneWrapper>
      <MenuTaskRow
        taskData={firstTask}
        isInTowerInfo={false}
        // towerTitle={undefined}
        // expireInSeconds={null}
        // id={1}
        // isAllowedToChange={false}
        // type={TasksType.TUTORIAL_TASK}
        // taskTitle="Войти в мир клиента"
        // status={TaskStatuses.CREATED}
        // money={400}
        // energy={0}
        // description=""
      />
      <Title>
        Новые задания будут доступны после
        <LinkTitle onClick={handleAuthButtonClick}> авторизации</LinkTitle>.
      </Title>
      <Button
        className={ButtonClassNames.NORMAL}
        content="Войти"
        callback={handleAuthButtonClick}
      />
    </UnauthorizedTaskZoneWrapper>
  );
};
