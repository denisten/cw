import React from 'react';
import {
  NotificationType,
  SettingsStore,
  SettingsType,
  ISettingStore,
} from '../../../../effector/settings/store';
import { Toggle } from '../../../../UI/toggle';
import { setNotificationSetting } from '../../../../effector/settings/events';
import { popUpSettingItemsTranslate, SettingsRow } from '..';

export const NotificationSettingWindow: React.FC<INotificationSettingWindow> = ({
  notification,
}) => {
  return (
    <>
      {Object.values(NotificationType).map((notifiSettingType, ind) => (
        <SettingsRow key={ind}>
          <span>{popUpSettingItemsTranslate[notifiSettingType]}</span>
          <Toggle
            state={notification[notifiSettingType].select}
            callBack={() =>
              setNotificationSetting({
                notificationType: notifiSettingType,
                flag: !notification[notifiSettingType].select,
              })
            }
          />
        </SettingsRow>
      ))}
    </>
  );
};

interface INotificationSettingWindow {
  notification: ISettingStore[SettingsType.NOTIFICATION];
}
