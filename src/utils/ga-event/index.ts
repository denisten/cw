import { UserDataStore } from '../../effector/user-data/store';
import TagManager from 'react-gtm-module';

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
  const { id, guid } = UserDataStore.getState();
  const tagManagerArgs = {
    dataLayer: { ...defaultGAEventProps, ...props, userId: id, guId: guid },
  };
  TagManager.dataLayer(tagManagerArgs);
};

interface IReactGAEventParams {
  eventLabel: string;
  eventCategory: string;
}
