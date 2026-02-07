import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export interface ClinicImage {
  id: string;
  image_url: string;
  is_primary: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  totalReviews: number;
  image_url: string;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date?: string;
}

export interface ClinicDetailData {
  id: string;
  name: string;
  type: string;
  address: string;
  rating: number;
  totalReviews: number;
  images: string[];
  tabs: string[];
  specialists: Specialist[];
  facilities: Facility[];
  reviews: Review[];
}

const API = 'http://localhost:3002';

export const useClinicDetail = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<ClinicDetailData>(
    id ? `${API}/api/clinics/${id}` : null,
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

  return { clinic: data, clinicError: error, clinicLoading: isLoading, mutate };
};
