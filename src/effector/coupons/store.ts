import { StoreDomain } from './domain';
import {
  fetchUserPurchases,
  editCouponCount,
  fetchShopCatalog,
  selectStoreItem,
  toggleShowUserPromocodes,
  openMarket,
  buyItem,
  resetUserShopStore,
} from './events';

export enum CouponTypes {
  COUPON_REPLACE = 'coupon.task.replace',
  COUPON_SKIP = 'coupon.task.skip',
}

export enum StoreItemTypes {
  COUPON = 'coupon',
  PROMO_CODE = 'promo_code',
}

export const TranslatedStoreItem = {
  [StoreItemTypes.PROMO_CODE]: 'Промокод',
  [StoreItemTypes.COUPON]: 'Купон',
};

export enum PurchasStatuses {
  NEW = 'new',
  USED = 'used',
}

export enum PromocodeTypes {
  MGTS_SPECIAL = 'promocode.universal.mgts-special',
}

const defaultUserCoupons = {
  [CouponTypes.COUPON_REPLACE]: { count: 0 },
  [CouponTypes.COUPON_SKIP]: { count: 0 },
};

const defaultUserPromocodes = {
  [PromocodeTypes.MGTS_SPECIAL]: {
    storeItem: null,
    status: null,
    content: null,
  },
};

const initState = {
  catalog: [],
  selectedStoreItem: null,
  userCoupons: { ...defaultUserCoupons },
  userPromocodes: { ...defaultUserPromocodes },
  showUserPromocodes: false,
  openedMarket: false,
};

export const UserMarketStore = StoreDomain.store<IUserStore>(initState)
  .on(buyItem.doneData, (state, { storeItem, status, count }) => ({
    ...state,
    userCoupons: {
      ...state.userCoupons,
      [storeItem.slug]: {
        count,
      },
    },
    userPromocodes: {
      ...state.userPromocodes,
      [storeItem.slug]: {
        count,
        status,
        storeItem,
      },
    },
  }))
  .on(openMarket, (state, payload) => ({
    ...state,
    openedMarket: payload,
  }))
  .on(toggleShowUserPromocodes, state => ({
    ...state,
    selectedStoreItem: null,
    showUserPromocodes: !state.showUserPromocodes,
  }))
  .on(selectStoreItem, (state, payload) => ({
    ...state,
    selectedStoreItem: payload,
  }))
  .on(fetchShopCatalog.doneData, (state, payload) => ({
    ...state,
    catalog: payload,
  }))
  .on(fetchUserPurchases, (state, payload) => {
    const stateClone = { ...state };
    if (payload.length > 0) {
      payload.forEach(purchase => {
        if (purchase.storeItem.type.slug === StoreItemTypes.COUPON) {
          const couponSlug = purchase.storeItem.slug as CouponTypes;
          stateClone.userCoupons[couponSlug] = {
            count: stateClone.userCoupons[couponSlug].count + 1,
          };
        }
        if (purchase.storeItem.type.slug === StoreItemTypes.PROMO_CODE) {
          const promocodeSlug = purchase.storeItem.slug as PromocodeTypes;
          const { storeItem, status, content } = purchase;
          stateClone.userPromocodes[promocodeSlug] = {
            content,
            status,
            storeItem,
          };
        }
      });
    }
    return stateClone;
  })
  .on(editCouponCount, (state, { couponType, count }) => ({
    ...state,
    userCoupons: {
      ...state.userCoupons,
      [couponType]: { count },
    },
  }))
  .on(resetUserShopStore, state => ({
    ...state,
    selectedStoreItem: null,
    userCoupons: { ...defaultUserCoupons },
    userPromocodes: { ...defaultUserPromocodes },
  }));

interface IUserStore {
  catalog: ICatalogItems[];
  selectedStoreItem: ICatalogItems | null;
  userCoupons: {
    [key in CouponTypes]: {
      count: number;
      name?: string;
    };
  };
  userPromocodes: {
    [key in PromocodeTypes]: {
      status: PurchasStatuses | null;
      storeItem: ICatalogItems | null;
      content: null | string;
    };
  };

  showUserPromocodes: boolean;
  openedMarket: boolean;
}

export interface IShopCatalog {
  items: ICatalogItems[];
}

export interface ICatalogItems {
  type: {
    slug: StoreItemTypes;
  };
  price: number;
  slug: CouponTypes | PromocodeTypes;
  name: string;
  description: string;
  maxTotalCount?: number;
}
