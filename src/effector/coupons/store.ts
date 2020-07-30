import { StoreDomain } from './domain';
import {
  fetchUserPurchases,
  editCouponCount,
  fetchShopCatalog,
  selectStoreItem,
  toggleShowUserPromocodes,
  openMarket,
} from './events';

export enum ShopItemsType {
  COUPON_REPLACE = 'coupon.task.replace',
  COUPON_SKIP = 'coupon.task.skip',
  MGTS_SPECIAL = 'promocode.universal.mgts-special',
}

export enum PurchasesType {
  COUPONS = 'coupons',
  PROMO_CODES = 'promo_codes',
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

const initState = {
  catalog: [],
  selectedStoreItem: null,
  userItems: {
    [ShopItemsType.COUPON_REPLACE]: { count: 0 },
    [ShopItemsType.COUPON_SKIP]: { count: 0 },
    [ShopItemsType.MGTS_SPECIAL]: { count: 0, status: null },
  },
  userPromocodes: {},
  showUserPromocodes: false,
  openedMarket: false,
};

export const UserMarketStore = StoreDomain.store<IUserStore>(initState)
  .on(openMarket, (state, payload) => ({
    ...state,
    openedMarket: payload,
  }))
  .on(toggleShowUserPromocodes, state => ({
    ...state,
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
  .on(fetchUserPurchases.doneData, (state, payload) => {
    const stateClone = { ...state };
    if (payload.items.length > 0) {
      payload.items.forEach(({ storeItem, count, status }) => {
        if (storeItem.type.slug === StoreItemTypes.COUPON) {
          stateClone.userItems[storeItem.slug] = { count };
        }

        if (storeItem.type.slug === StoreItemTypes.PROMO_CODE) {
          stateClone.userItems[storeItem.slug] = { count, status };
        }
      });
    }
    return stateClone;
  })
  .on(editCouponCount, (state, { couponType, count }) => ({
    ...state,
    userItems: {
      ...state.userItems,
      [couponType]: { count },
    },
  }));

interface IUserStore {
  catalog: IShopCatalog[];
  selectedStoreItem: ICatalogItems | null;
  userItems: {
    [key in ShopItemsType]: { count: number; status?: PurchasStatuses | null };
  };

  showUserPromocodes: boolean;
  openedMarket: boolean;
}

export interface IShopCatalog {
  name: string;
  slug: PurchasesType;
  items: ICatalogItems[];
}

export interface ICatalogItems {
  type: {
    slug: StoreItemTypes;
  };
  price: number;
  slug: ShopItemsType;
  name: string;
  description: string;
}
