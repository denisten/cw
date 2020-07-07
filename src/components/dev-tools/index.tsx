import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonClassNames } from '../../UI/button';
import { RowWrapper } from '../../UI/row-wrapper';
import { devLogin } from '../../effector/user-data/events';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

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
          callback={async () => {
            await devLogin(phone);
            editIsAuthorizedFlag(true);
          }}
        />
      </RowWrapper>
    </DevToolsWrapper>
  );
};
