'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, MapPin, StarIcon } from 'lucide-react';
import { Input } from '@/components/elements/input';
import { Button } from '@/components/elements/button';
import { Card } from '@/components/elements/card';
import { Header } from '@/components/elements/header';
import { CategoriesSection } from '@/components/fragments/CategoriesSection';
import { RecommendedClinicsSection } from '@/components/fragments/RecommendedClinicsSection';
import { useClinics } from '@/lib/hooks';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const promoItems = [
  {
    title: 'Looking for',
    titleHighlight: 'Specialist Doctors?',
    description: 'Schedule an appointment with our top doctors.',
    images: [
      'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7195369/pexels-photo-7195369.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8376154/pexels-photo-8376154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    title: 'Video Consultation',
    titleHighlight: 'Available Now',
    description: 'Consult with doctors from the comfort of your home.',
    images: [
      'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8547286/pexels-photo-8547286.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4225896/pexels-photo-4225896.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8376318/pexels-photo-8376318.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
];

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch clinics based on search query
  const { clinics: searchResults = [] } = useClinics(searchQuery);
  
  // Get all clinics for recommended section
  const { clinics: recommendedClinics = [] } = useClinics();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleClinicClick = (clinicId: string) => {
    router.push(`/clinic/${clinicId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50/30 to-white">
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: width 0.3s ease;
        }
        :global(.swiper-pagination-bullet-active) {
          width: 28px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 4px;
        }
      `}</style>
      <Header isScrolled={isScrolled} />

      <main className="pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-linear-to-b from-teal-100 to-teal-400 translate-x-1/5" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Partner Kepercayaan Anda dalam Mencari{' '}
                  <span className="text-teal-600">Klinik Kesehatan</span>
                </h1>

                <p className="text-gray-600 leading-relaxed text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
                  nunc non tortor integer metus lectus. Bibendum tellus proin sagittis
                  at lacus. In at eget molestie, sit consequat nullam ut lectus in in ac
                  quam nullis, ut lectus arcu cursus. Proin tempor odio eu mauris
                  molestie, et feugiat adipiscing.
                </p>

                <Button className="bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-2xl text-white px-8 py-6 rounded-xl shadow-lg shadow-teal-600/30 transition-all hover:shadow-xl hover:shadow-teal-600/40">
                  Book an appointment
                </Button>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-200/50 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-200/50 rounded-full blur-2xl" />

                <div className="relative rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Doctor"
                    className="rounded-2xl w-full h-auto"
                    width={400}
                    height={300}
                  />

                  <div className="absolute bottom-15 -left-6 bg-white rounded-xl shadow-xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <StarIcon className="h-6 w-6 fill-teal-600 text-teal-600 bg-gray-100 rounded p-1" />
                      <span className="text-sm font-bold text-teal-600">Mudah untuk buat janji</span>
                    </div>
                  </div>

                    <div className="absolute bottom-30 -right-6 bg-white rounded-2xl shadow-xl p-4 border-2 border-transparent bg-clip-padding" style={{
                      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #93c5fd, #fbcfe8)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box'
                    }}>
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-pink-400 to-rose-500 border-2 border-white" />
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 border-2 border-white" />
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-amber-400 to-orange-500 border-2 border-white" />
                      </div>
                      <div>
                      <div className="font-bold text-gray-900">1400+</div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-500">Happy Customers</div>
                    <div className="flex items-center mt-2 space-x-1">
                      {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-gray-600 ml-1"> (4.7 Stars)</span>
                    </div>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20">
          <Card className="p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">
              Cari Klinik Pilihan Anda
            </h2>

            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari klinik"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-12 pr-4 py-6 text-base border-gray-200 focus:border-teal-500 focus:ring-teal-500 font-semibold"
                />
              </div>

              {showSuggestions && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  {searchQuery.length > 0 ? (
                    <>
                      {searchResults.length > 0 ? (
                        <>
                          <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-gray-900">
                                Hasil untuk &quot;{searchQuery}&quot;
                              </h3>
                              <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                                Default ↓
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {['Semua', 'Umum', 'Mata', 'Gigi', 'THT'].map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => cat !== 'Semua' ? handleCategoryFilter(cat) : setSelectedCategory(null)}
                                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                    (cat === 'Semua' && !selectedCategory) || selectedCategory === cat
                                      ? 'bg-teal-600 text-white'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>

                            <div className="text-xs text-gray-500 mt-3">
                              {searchResults.length} Ditemukan
                            </div>
                          </div>

                          <div className="max-h-96 overflow-y-auto">
                            {searchResults.map((clinic) => (
                              <div
                                key={clinic.id}
                                onClick={() => handleClinicClick(clinic.id)}
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
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <p>Tidak ada hasil untuk &quot;{searchQuery}&quot;</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <RecommendedClinicsSection clinics={recommendedClinics} onClinicClick={handleClinicClick} />
                  )}
                </div>
              )}
            </div>
          </Card>
        </section>

        <CategoriesSection />

        <section className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Promo <span className="text-teal-600">Menarik</span>
            </h2>
          </div>

          <div className="flex overflow-x-auto pb-4">
            <div className="w-screen flex items-center space-x-6 px-8">
              {promoItems.map((promo, index) => (
                <div key={index} className="relative rounded-2xl overflow-hidden group cursor-pointer h-80">
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={{
                      clickable: true,
                      dynamicBullets: false,
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    className="w-full h-full"
                  >
                    {promo.images.map((image, imgIndex) => (
                      <SwiperSlide key={imgIndex}>
                        <Image
                          src={image}
                          alt={`${promo.title} ${imgIndex + 1}`}
                          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                          width={800}
                          height={400}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                    <h3 className="text-2xl font-bold mb-2">
                      {promo.title}<br />{promo.titleHighlight}
                    </h3>
                    <p className="text-sm text-gray-200 mb-4">
                      {promo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
