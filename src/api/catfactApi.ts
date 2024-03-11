import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CatFactData {
  fact: string;
}

export const useGetCatFact = () => {
  return useQuery({
    queryKey: ['cat-fact-data'],
    queryFn: async (): Promise<CatFactData> => {
      const { data } = await axios.get('/fact');
      return data;
    },
    enabled: false,
  });
};
