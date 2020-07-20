import { MenuDomain } from './domain';
import { MenuItems } from '../../UI/menu-paragraph';

export const menuOpened = MenuDomain.event<MenuItems>();
export const menuClosed = MenuDomain.event();
