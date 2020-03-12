import { IDialogData } from '../../components/tutorial-dialog/dialog-messages-service';
import { UserDataStore } from '../../effector/user-data/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';

export const modifyTutorialData = (
  dialogData: IDialogData,
  condition: TutorialConditions
): IDialogData => {
  if (condition === TutorialConditions.DIALOG_CONFIRM_CITY_NAME) {
    const { messages } = dialogData;
    const { worldName } = UserDataStore.getState();
    const modifiedMessages = [`${worldName} ${messages[0]}`];
    return { ...dialogData, messages: modifiedMessages };
  }
  return dialogData;
};
