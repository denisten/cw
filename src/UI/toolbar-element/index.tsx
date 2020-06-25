import React from 'react';
import iconFeed from './feed.svg';
import iconNotifications from './notifications.svg';
import iconShop from './shop.svg';
import iconTask from './task.svg';

export enum ToolbarElements {
  TASK = 'task',
  SHOP = 'shop',
  FEED = 'feed',
  NOTIFICATIONS = 'notifications',
}

const toolbarElementImgSelector = (el: ToolbarElements) => {
  switch (el) {
    case ToolbarElements.FEED:
      return iconFeed;
    case ToolbarElements.NOTIFICATIONS:
      return iconNotifications;
    case ToolbarElements.SHOP:
      return iconShop;
    case ToolbarElements.TASK:
      return iconTask;
  }
};

export const ToolbarElement: React.FC<IToolbarElement> = ({
  type,
  callback,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    callback(type);
  };
  return (
    <img
      src={toolbarElementImgSelector(type)}
      alt={type}
      onClick={handleClick}
    />
  );
};

interface IToolbarElement {
  type: ToolbarElements;
  callback: (type: ToolbarElements) => void;
}
