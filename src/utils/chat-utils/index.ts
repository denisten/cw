import { IMessage, Sender } from '../../api/tasks-api/session';
import React from 'react';
import { ITask } from '../../effector/tasks-store/store';
import { MissionsStore } from '../../effector/missions-store/store';

const lettersPerSecond = 70,
  ms = 1000;

export const checkLastFailedMessage = (messages: IMessage[]) =>
  messages && messages[messages.length - 1]?.failedTask;

export const checkLastSuccessMessage = (messages: IMessage[]) =>
  messages && messages[messages.length - 1]?.successTask;

export const isChatEnded = (messages: IMessage[]) =>
  checkLastFailedMessage(messages) || checkLastSuccessMessage(messages);

export const calculateMessageDelay = (letters: number) =>
  (letters / lettersPerSecond) * ms;

export const isLastAnswerBelongToUser = (messages: IMessage[]) =>
  messages[messages.length - 1]?.direction === Sender.FRONTEND;

export const scrollToBottom = (
  chatContainerRef: React.RefObject<HTMLDivElement>
) =>
  chatContainerRef.current &&
  chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);

export const checkLastMessage = (
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

export const isLast = (idx: number, botLastMessages: IMessage[]) =>
  botLastMessages.length - 1 === idx;

export const findLastUserMessageIndex = (messages: IMessage[]) =>
  messages.reduce(
    (acc, message, index) =>
      message.direction === Sender.FRONTEND ? index : acc,
    0
  );

export const findSubtask = (taskId: number): ITask | undefined => {
  let result = undefined;
  MissionsStore.getState().forEach(mission => {
    mission.userSubTasks.forEach(subtask => {
      if (subtask.id === taskId) result = subtask;
    });
  });
  return result;
};
