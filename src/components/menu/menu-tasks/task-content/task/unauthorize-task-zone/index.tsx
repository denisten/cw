import React from 'react';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../../../../../UI/button';
import { MenuTaskRow } from '../../../../../tasks/menu-task-row';
import { TasksType } from '../../../index';
import { handleAuthButtonClick } from '../../../../../../utils/handle-auth-button-click';
import { TaskStatuses } from '../../../../../../api/enums';

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

export const UnauthorizedTaskZone = () => {
  return (
    <UnauthorizedTaskZoneWrapper>
      <MenuTaskRow
        towerTitle={undefined}
        expireInSeconds={null}
        id={1}
        isInTowerInfo={false}
        isAllowedToChange={false}
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
    </UnauthorizedTaskZoneWrapper>
  );
};
