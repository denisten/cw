import React from 'react';
import iconShop from './shop.svg';
import iconTask from './task.svg';

export enum ToolbarElements {
  TASK = 'task',
  SHOP = 'shop',
}

const toolbarElementImgSelector = (el: ToolbarElements) => {
  switch (el) {
    case ToolbarElements.SHOP:
      return iconShop;
    case ToolbarElements.TASK:
      return iconTask;
  }
};

export const ToolbarElement: React.FC<IToolbarElement> = ({ type }) => (
  <img src={toolbarElementImgSelector(type)} alt={type} />
);

interface IToolbarElement {
  type: ToolbarElements;
}
