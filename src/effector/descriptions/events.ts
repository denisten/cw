import { DescriptionsDomain } from './domain';
import { getDescriptions } from '../../api/get-descriptions';

export const fetchDescriptions = DescriptionsDomain.effect(
  'fetch descriptions',
  {
    handler: async () => {
      return await getDescriptions();
    },
  }
);
