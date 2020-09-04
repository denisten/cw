import { UserDataStore } from '../../effector/user-data/store';
import TagManager from 'react-gtm-module';
import { AppConditionStore } from '../../effector/app-condition/store';

const defaultGAEventProps = {
  event: 'mtsEvent',
  eventAction: 'element_click',
  eventValue: null,
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
  const { operatorId, guid } = UserDataStore.getState();
  const { isAuthorized } = AppConditionStore.getState();
  const tagManagerArgs = {
    dataLayer: {
      ...defaultGAEventProps,
      ...props,
      abonent: operatorId,
      userId: guid,
      guId: guid,
      userAuth: isAuthorized ? '1' : '0',
    },
  };
  // eslint-disable-next-line no-console
  console.log(tagManagerArgs);
  TagManager.dataLayer(tagManagerArgs);
};

interface IReactGAEventParams {
  eventLabel?: string;
  eventCategory?: string;
  eventAction?: string;
  event?: string;
  buttonLocation?: string;
  eventContent?: string;
  eventContext?: string;
}
