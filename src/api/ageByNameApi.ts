import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';

export const useAgeByName = (ferstName: string) => {
  const [previousRequest, setPreviousRequest] =
    useState<CancelTokenSource | null>(null);

  return useQuery({
    queryKey: ['age-by-name'],
    queryFn: async () => {
      // Отменяем предыдущий запрос, если он есть
      if (previousRequest) {
        previousRequest.cancel('Отмена предыдущего запроса');
      }

      const source = axios.CancelToken.source();
      setPreviousRequest(source);

      const { data } = await axios.get(`/age-by-name?name=${ferstName}`, {
        cancelToken: source.token,
      });
      return data;
    },
    enabled: false,
  });
};
