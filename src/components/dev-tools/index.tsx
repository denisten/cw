import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { refreshBD } from '../../api/dev-api/refresh-bd';
import { fetchTasks } from '../../effector/missions-store/events';
import { RowWrapper } from '../../UI/row-wrapper';
import { devLogin } from '../../effector/user-data/events';
import { createMockupOfMessages } from '../../effector/task-messages/events';

const DevToolsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

export const DevTools = () => {
  const [phone, setPhone] = useState('');
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
        content="Refresh BD"
        callback={refreshBD}
      />
      <Button
        className={ButtonClassNames.NORMAL}
        content="Get tasks"
        callback={() => fetchTasks('')}
      />
      <Button
        className={ButtonClassNames.NORMAL}
        content="Get messages in chat"
        callback={() => createMockupOfMessages()}
      />
      <RowWrapper>
        <input
          type="text"
          value={phone}
          onChange={e => {
            setPhone(e.target.value);
          }}
          style={{ marginRight: '100px' }}
        />
        <Button
          className={ButtonClassNames.NORMAL}
          content="Login"
          callback={() => devLogin(phone)}
        />
      </RowWrapper>
    </DevToolsWrapper>
  );
};
