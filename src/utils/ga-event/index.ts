import ReactGA from 'react-ga';
import { UserDataStore } from '../../effector/user-data/store';

const defaultGAEventProps = {
  event: 'mtsEvent',
  eventAction: 'element_click',
  eventValue: null,
  userAuth: '0',
  abonent: '1',
  screenName: '/',
  eventContent: 'null',
  eventContext: 'null',
  buttonLocation: 'popup',
  filterName: 'null',
  pageType: 'main',
  actionGroup: 'interactions',
  productName: null,
  productId: null,
  maccountType: 'master',
  numberType: 'virt',
  accountType: 'mobile',
  touchPoint: 'mobile',
  currentTariff: 'tarifische',
};

export const reactGAEvent = (props: IReactGAEventParams) => {
  const gaEvent = ReactGA.event as (args: unknown) => void;
  const { id, guid } = UserDataStore.getState();
  gaEvent({ ...defaultGAEventProps, ...props, userId: id, guId: guid });
};

interface IReactGAEventParams {
  eventLabel: string;
  eventCategory: string;
}
