import React from 'react';
import styled from 'styled-components';
import {
  NotificationType,
  SettingsStore,
} from '../../../../effector/settings/store';
import { Toggle } from '../../../../UI/toggle';
import { useStore } from 'effector-react';
import { setNotificationSetting } from '../../../../effector/settings/events';

const NotificationSettingsRow = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 30px 0px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 14px;
    line-height: 20px;
    color: #02adc9;
  }

  &:last-child {
    padding-bottom: 30px;
  }

  &:first-child {
    padding-top: 30px;
  }
`;

const notificationItemsTranslate = {
  [NotificationType.TASKS]: 'Задания',
  [NotificationType.BUILDING]: 'Здания',
  [NotificationType.OTHER]: 'Другое',
};

export const NotificationSettingWindow: React.FC = () => {
  const { notification } = useStore(SettingsStore);

  const item = Object.values(NotificationType).map((notifiSettingType, ind) => (
    <NotificationSettingsRow key={ind}>
      <span>{notificationItemsTranslate[notifiSettingType]}</span>
      <Toggle
        state={notification[notifiSettingType].select}
        callBack={() =>
          setNotificationSetting({
            notificationType: notifiSettingType,
            flag: !notification[notifiSettingType].select,
          })
        }
      />
    </NotificationSettingsRow>
  ));
  return <div>{item}</div>;
};
