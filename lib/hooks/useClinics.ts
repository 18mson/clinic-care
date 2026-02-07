import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export interface Clinic {
  id: string;
  name: string;
  type: string;
  address: string;
  rating: number;
  totalReviews: number;
  image_url: string;
}

const API = process.env.REACT_APP_API_URL || 'http://localhost:3002';

export const useClinics = (query?: string) => {
  const url = query 
    ? `${API}/api/clinics?name=${encodeURIComponent(query)}`
    : `${API}/api/clinics`;

  const { data, error, isLoading, mutate } = useSWR<Clinic[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    clinics: data,
    clinicsError: error,
    clinicsLoading: isLoading,
    mutate,
  };
};
