import { UserDataStore } from '../../effector/user-data/store';
import TagManager from 'react-gtm-module';
import { AppConditionStore } from '../../effector/app-condition/store';

const defaultGAEventProps = {
  event: 'mtsEvent',
  eventAction: 'element_click',
  eventValue: null,
  screenName: '/',
  eventContent: null,
  eventContext: null,
  buttonLocation: 'popup',
  filterName: null,
  pageType: 'main',
  actionGroup: 'interactions',
  productName: null,
  productId: null,
  numberType: null,
  accountType: null,
  touchPoint: 'web',
  currentTariff: null,
};

export const reactGAEvent = (
  props: IReactGAEventParams,
  notEventAction?: boolean
) => {
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
      accountType: isAuthorized ? 'mobile' : null,
    },
  };

  if (notEventAction) {
    delete tagManagerArgs.dataLayer.eventAction;
  }

  TagManager.dataLayer(tagManagerArgs);
};

interface IReactGAEventParams {
  eventLabel?: string;
  eventCategory?: string;
  eventAction?: string;
  event?: string;
  buttonLocation?: string | null;
  eventContent?: string;
  eventContext?: string;
  filterName?: string;
  actionGroup?: string;
}
