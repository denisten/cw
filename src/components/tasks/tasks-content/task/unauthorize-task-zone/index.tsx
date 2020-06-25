import React from 'react';
import styled from 'styled-components';
import { Task } from '../../../tasks-row';
import { TasksType } from '../../..';
import { TaskStatuses } from '../../../../../api/tasks/get-tasks';
import { handleAuthButtonClick } from '../../../../../utils/handle-auth-button-click';
import { Button, ButtonClassNames } from '../../../../../UI/button';

const UnauthorizeTaskZoneWrapper = styled.div`
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

export const UnauthorizeTaskZone = () => {
  return (
    <UnauthorizeTaskZoneWrapper>
      <Task
        expireInSeconds={null}
        id={1}
        isInTowerInfo={false}
        isAllowedToChange={false}
        couponsCount={0}
        type={TasksType.TUTORIAL_TASK}
        taskTitle="Войти в мир клиента"
        status={TaskStatuses.CREATED}
        money={400}
        energy={0}
        description=""
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
    </UnauthorizeTaskZoneWrapper>
  );
};
