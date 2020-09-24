import { IMessage, Sender } from '../../api/tasks-api/session';
import React from 'react';
import { TaskTypes } from '../../app';

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

export {
  checkLastFailedMessage,
  checkLastSuccessMessage,
  isChatEnded,
  calculateMessageDelay,
  isLastAnswerBelongToUser,
  scrollToBottom,
};
