import { MenuDomain } from './domain';
import { menuOpened, menuClosed, setOpenEncyclopediaState } from './events';
import { MenuItems } from '../../UI/menu-paragraph';

export enum TowerInfoContentValues {
  DESCRIPTION = 0,
  CHAT = 1,
  TASK = 2,
}

const initState = {
  selectedMenuItem: null,
  encyclopediaDisplayFlag: false,
};

export const MenuStore = MenuDomain.store<AppConditionType>(initState)
  .on(setOpenEncyclopediaState, (state, payload) => ({
    ...state,
    encyclopediaDisplayFlag: payload,
  }))
  .on(menuOpened, (state, payload) => ({
    ...state,
    selectedMenuItem: payload,
  }))
  .on(menuClosed, state => ({
    ...state,
    selectedMenuItem: null,
  }));

export type AppConditionType = {
  selectedMenuItem: MenuItems | null;
  encyclopediaDisplayFlag: boolean;
};
