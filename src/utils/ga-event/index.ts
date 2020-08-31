import ReactGA from 'react-ga';

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
  const gaEvent = (ReactGA.event as unknown) as (args: unknown) => void;
  gaEvent({ ...defaultGAEventProps, ...props });
};

interface IReactGAEventParams {
  userId: number;
  eventLabel: string;
  guId: string;
  eventCategory: string;
}
