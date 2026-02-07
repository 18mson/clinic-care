'use client';

import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Clinic } from '@/lib/hooks';

interface RecommendedClinicsSectionProps {
  clinics: Clinic[];
  onClinicClick: (clinicId: string) => void;
}

export function RecommendedClinicsSection({ clinics, onClinicClick }: RecommendedClinicsSectionProps) {

  return (
    <>
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Rekomendasi Klinik</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            onClick={() => onClinicClick(clinic.id)}
            className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <Image
                src={clinic.image_url}
                alt={clinic.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {clinic.name}
                </h4>
                <div className="text-xs text-gray-600 mb-2">
                  Klinik {clinic.category}
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-1 mb-2">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{clinic.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-gray-700">
                      {clinic.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    · {clinic.review_count} Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
