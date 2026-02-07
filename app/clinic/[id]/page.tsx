'use client';

import { type ComponentType } from 'react';
import Link from 'next/link';
import { Button } from '@/components/elements/button';
import { Star, MapPin, Wifi, Wind, Droplet, Heart } from 'lucide-react';
import Image from 'next/image';
import { useClinicDetail } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import { MOCK_DOCTOR, MOCK_IMAGES, normalizeImage, PLACEHOLDER_IMAGE } from '@/lib/mock/placeholders';
import { Header } from '@/components/elements/header';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  'wifi': Wifi,
  'parking': Wind,
  'air-conditioning': Wind,
  'spa': Droplet,
};

export default function ClinicDetail() {

  const params = useParams();
  const id = params.id as string;

  // Fetch clinic detail data
  const { clinic, clinicLoading, clinicError } = useClinicDetail(id);

  if (clinicLoading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  if (clinicError || !clinic) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Clinic not found</div>;
  }

  const rawImages: string[] = clinic.images && clinic.images.length > 0 ? clinic.images : [];
  const finalImages = rawImages.map(normalizeImage).length < 6 ? MOCK_IMAGES.clinic1 : rawImages.map(normalizeImage);
  const imagesToShow = finalImages.length > 0 ? finalImages[0] : PLACEHOLDER_IMAGE;
  return (
    <div className="min-h-screen bg-white md:pt-16">
      <Header isScrolled={true} />
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-600 flex items-center space-x-2 mt-10">
          <Link href="/" className="hover:text-teal-600">Beranda</Link>
          <span>/</span>
          <Link href="/" className="hover:text-teal-600">Klinik</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{clinic.name}</span>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div className=" w-full aspect-4/3">
            <Image
              src={imagesToShow}
              alt="Main clinic image"
              className="w-full h-full object-cover rounded-2xl"
              width={300}
              height={200}
            />
          </div>
          <div className="p-10 grid grid-cols-3 gap-4">
            {finalImages.map((img, idx) => (
              <div key={idx} className="w-full overflow-hidden rounded-xl aspect-3/4">
                <Image
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover"
                  width={300}
                  height={200}
                />
              </div>
            ))}
          </div>

        </div>
          <div className="flex space-x-8 border-b border-gray-200 mb-8 sticky top-16 bg-white z-40">
            {['info', 'specialists', 'facilities', 'reviews'].map((tab) => (
              <ScrollLink
                to={tab}
                spy
                smooth
                offset={-120}
                className="px-1 py-4 font-medium text-sm transition-colors border-b-2 border-transparent hover:text-teal-600 cursor-pointer text-gray-600"
                activeClass="text-teal-600 border-teal-600"
                key={tab}
              >
                {tab === 'info' && 'Info Umum'}
                {tab === 'specialists' && 'Spesialis'}
                {tab === 'facilities' && 'Fasilitas'}
                {tab === 'reviews' && 'Review'}
              </ScrollLink>
            ))}
          </div>
          <ScrollElement name="info">
            <div className="flex justify-between items-start px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 space-y-6 md:space-y-0 md:flex-row flex-col md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{clinic.name}</h1>
                <div className="inline-blockpy-1 text-teal-700 text-xs font-semibold rounded-full mb-3">
                  {clinic.type}
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(clinic.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{clinic.rating}</span>
                    <span> | {clinic.totalReviews} Reviews</span>
                  </div>
                </div>
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700 text-white py-3">
                Book Appointment
              </Button>
            </div>
          </ScrollElement>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <ScrollElement name="specialists">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Spesialis ({clinic.specialists?.length || 0})</h3>
              <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
                {clinic.specialists?.map((specialist) => {
                  const num = Number(specialist.id) || 1;
                  const key = (`doc${(num % 4) + 1}`) as keyof typeof MOCK_DOCTOR;
                  const src = MOCK_DOCTOR[key];

                  return (
                  <div key={specialist.id} className="w-56 shrink-0 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1 aspect-square">
                        <Image
                          src={src}
                          alt={specialist.name}
                          className="w-20 h-20 rounded-xl mb-3 object-cover"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="border-b border-gray-200 flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{specialist.name}</h4>
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{specialist.specialization}</p>
                      <div className="flex items-center space-x-1 text-xs">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{specialist.rating}</span>
                        <span className="text-gray-500">· {specialist.totalReviews} Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
          </ScrollElement>

          <ScrollElement name="facilities">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Fasilitas</h3>
              <div className="flex px-6">
                <div className="grid grid-cols-2 gap-4 pb-10">
                  {clinic.facilities?.map((facility) => {
                    const Icon = iconMap[facility.icon] || Droplet;
                    return (
                      <div key={facility.id} className="flex items-center p-2 rounded-xl transition-colors">
                        <Icon className="h-8 w-8 text-teal-600 mb-3" />
                        <p className="text-sm font-medium text-gray-900 text-center">{facility.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollElement>

          <ScrollElement name="reviews">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
                <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Lihat semua
                </a>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-10 -mx-2 px-2">
                {clinic.reviews?.map((review) => (
                  <div key={review.id} className="w-80 shrink-0 p-6 border border-gray-200 rounded-xl bg-white shadow-xl">
                    <div className="flex items-center space-x-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{review.userName}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollElement>
        </div>
      </div>
    </div>
  );
}
