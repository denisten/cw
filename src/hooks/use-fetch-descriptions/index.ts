import { useEffect } from 'react';
import { fetchDescriptions } from '../../effector/descriptions/events';

export const useFetchDescriptions = () => {
  useEffect(() => {
    fetchDescriptions('');
  }, []);
};
