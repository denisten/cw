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

enum TaskTypes {
  TUTORIAL_TASK = 'tutorial-task',
  TASK = 'task',
  CHALLENGE = 'challenge',
  MISSION = 'mission',
  NBO = 'nbo',
  PAID = 'paid',
  TARGET = 'target',
  INFORMATIONAL = 'informational',
  PRODUCT_QUIZ = 'product-quiz',
  RELATED_QUIZ = 'related-quiz',
  COSMETIC = 'cosmetic',
  SUBTASK = 'subtask',
}

const firstTask: ITask = {
  id: 1,
  status: TaskStatuses.CREATED,
  expireAt: '1000',
  expireInSeconds: null,
  taskTypeSlug: TaskTypes.TUTORIAL_TASK,
  productSlug: TowersTypes.MAIN_TOWER,
  title: 'Авторизация',
  legend: '',
  description: '',
  order: null,
  energy: 100,
  money: 100,
  userSubTasks: [],
};

export const UnauthorizedTaskZone = () => {
  return (
    <UnauthorizedTaskZoneWrapper>
      <MenuTaskRow task={firstTask} isInTowerInfo={false} isSubTask={false} />
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
