import React from 'react';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { generateTasks } from '../../api/dev-api/generate-tasks';
import { refreshBD } from '../../api/dev-api/refresh-bd';
import { fetchTasks } from '../../effector/missions-store/events';

const DevToolsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

export const DevTools = () => {
  return (
    <DevToolsWrapper>
      <p>
        Если хочешь получить задания: <br />
        1 - рефреш
        <br />
        2 - авторизоваться
        <br />3 - сгенерировать <br />4 - получить задания
      </p>
      <Button
        className={ButtonClassNames.NORMAL}
        content="Generate Tasks"
        callback={generateTasks}
      />

      <Button
        className={ButtonClassNames.NORMAL}
        content="Refresh BD"
        callback={refreshBD}
      />
      <Button
        className={ButtonClassNames.NORMAL}
        content="Get tasks"
        callback={() => fetchTasks('')}
      />
    </DevToolsWrapper>
  );
};
