import { IMessage, Sender } from '../../api/tasks-api/session';
import React from 'react';
import { ITask } from '../../effector/tasks-store/store';
import { MissionsStore } from '../../effector/missions-store/store';

const lettersPerSecond = 70,
  ms = 1000;

const checkLastFailedMessage = (messages: IMessage[]) =>
  messages && messages[messages.length - 1]?.failedTask;

const checkLastSuccessMessage = (messages: IMessage[]) =>
  messages && messages[messages.length - 1]?.successTask;

const isChatEnded = (messages: IMessage[]) =>
  checkLastFailedMessage(messages) || checkLastSuccessMessage(messages);

const calculateMessageDelay = (letters: number) =>
  (letters / lettersPerSecond) * ms;

const isLastAnswerBelongToUser = (messages: IMessage[]) =>
  messages[messages.length - 1]?.direction === Sender.FRONTEND;

const scrollToBottom = (chatContainerRef: React.RefObject<HTMLDivElement>) =>
  chatContainerRef.current &&
  chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);

const checkLastMessage = (
  messages: IMessage[],
  setResponseStatus: () => void,
  setSavedMessages: () => void
) => {
  if (isChatEnded(messages) || isLastAnswerBelongToUser(messages)) {
    setResponseStatus();
    setSavedMessages();
    return true;
  }
};

const isLast = (idx: number, botLastMessages: IMessage[]) =>
  botLastMessages.length - 1 === idx;

const findLastUserMessageIndex = (messages: IMessage[]) =>
  messages.reduce(
    (acc, message, index) =>
      message.direction === Sender.FRONTEND ? index : acc,
    0
  );

const findSubtask = (taskId: number): ITask | undefined =>
  MissionsStore.getState().find(mission =>
    mission.userSubTasks.find(subTask => subTask.id === taskId)
  );

export {
  checkLastFailedMessage,
  checkLastSuccessMessage,
  isChatEnded,
  calculateMessageDelay,
  isLastAnswerBelongToUser,
  scrollToBottom,
  checkLastMessage,
  isLast,
  findLastUserMessageIndex,
  findSubtask,
};
