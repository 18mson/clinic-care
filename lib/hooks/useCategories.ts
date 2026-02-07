import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export interface Category {
  id: number;
  name: string;
}

const API = process.env.REACT_APP_API_URL || 'http://localhost:3002';

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    `${API}/api/categories`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
      focusThrottleInterval: 300000, // 5 minutes
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    categories: data,
    categoriesError: error,
    categoriesLoading: isLoading,
    mutate, // For manual refresh
  };
};

