import { ProductLevelDomain } from './domain';
import { getProductLevelData } from '../../api/get-product-level-data';

export const fetchProductLevelData = ProductLevelDomain.effect({
  handler: async () => {
    return await getProductLevelData();
  },
});
