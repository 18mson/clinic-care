'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, MapPin, Search, Star, StarIcon, Stethoscope, X } from 'lucide-react';
import { Button } from '@/components/elements/button';
import { Header } from '@/components/elements/header';
import { CategoriesSection } from '@/components/fragments/CategoriesSection';
import { useCategories, useClinics } from '@/lib/hooks';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SearchSection } from '@/components/fragments/SearchSection';
import ClinicSection from '@/components/fragments/ClinicSection';
import { PLACEHOLDER_HOSPITAL } from '@/lib/mock/placeholders';
import { BookingModal } from '@/components/elements/BookingModal';

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
  const [isBooking, setIsbooking] = useState(false);

  // Fetch clinics based on search query
  const { clinics: searchResults = [] } = useClinics(searchQuery);

  const { categories } = useCategories();
  
  const filteredResults = selectedCategory
  ? searchResults.filter((clinic) =>
      clinic.type
        ?.toLowerCase()
        .includes(selectedCategory.toLowerCase())
    )
  : searchResults


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
      {isBooking && (
        <BookingModal isOpen={isBooking} onClose={() => setIsbooking(false)} />
      )}
      {/* Mobile Only Top Section */}
      <section className="block md:hidden relative bg-linear-to-tr from-teal-700 to-teal-400 rounded-b-3xl pt-6 pb-4 mb-4 overflow-visible">
        <div className="flex justify-between items-start relative px-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-white" />
              <span className="font-bold text-white text-2xl">CliniCare</span>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -top-1 -right-1.5 z-10 w-3 h-3 bg-red-500 border-2 border-white rounded-full pointer-events-none"></span>
            <Bell className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5 mb-1 px-4">
          <Image
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="Dita Nirmala"
            width={46}
            height={46}
            className="rounded-full w-11 h-11 object-cover border-4 border-white shadow-md"
          />
          <div>
            <span className="font-semibold text-white text-lg block leading-tight">Dita Nirmala</span>
            <span className="text-teal-100 text-xs flex items-center gap-1">Kebayoran Baru
              <MapPin className="h-4 w-4 text-white" />
            </span>
          </div>
        </div>
        {/* Search Bar */}
        <div className="mt-4 px-4">
          <div className="flex items-center gap-3 bg-white rounded-xl overflow-hidden shadow-sm px-3 py-2">
            <Search className="absolute left-5 transform h-5 w-5 text-gray-400" />
            <input 
              className="ml-4 border-0 flex-1 focus:outline-none focus:ring-0 text-base text-gray-900 bg-transparent" 
              placeholder="Cari klinik..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              onFocus={() => setShowSuggestions(true)} 
            />
            {!!searchQuery.length && (
              <button 
                onClick={() => setSearchQuery('')}
                type="button" 
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        {showSuggestions && (
            <div className="absolute z-20 w-full mt-5 bg-white border-gray-100 overflow-hidden">
              {searchQuery.length > 0 && (
                <>
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {!!categories?.length && categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => cat.name !== 'Semua' ? handleCategoryFilter(cat.name) : handleCategoryFilter('')}
                              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                (cat.name === 'Semua' && !selectedCategory) || selectedCategory === cat.name
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-slate-600'
                              }`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <div className="text-xs text-gray-500 mt-3">
                            {filteredResults.length} Ditemukan
                          </div>
                          <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                            Default ↓
                          </button>
                        </div>
                      </div>

                      <div className="overflow-y-auto min-h-screen">
                        {filteredResults.map((clinic) => (
                          <div
                            key={clinic.id}
                            onClick={() => handleClinicClick(clinic.id)}
                            className="mx-4 my-2 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50 shadow-lg last:border-0 cursor-pointer"
                          >
                            <div className="flex items-start space-x-4">
                              <Image
                                src={PLACEHOLDER_HOSPITAL}
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
                                  {clinic.type}
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
                                    · {clinic.totalReviews} Reviews
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-gray-500 min-h-screen">
                      <p>Tidak ada hasil untuk &quot;{searchQuery}&quot;</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
      </section>

      <main className="md:pt-16">
        <section className="md:block relative hidden overflow-hidden">
          <div className="absolute overflow-hidden top-0 right-0 w-96 h-96 rounded-full bg-linear-to-b from-teal-100 to-teal-400 translate-x-1/5" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative">
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

                <Button 
                  className="bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-2xl text-white px-8 py-6 rounded-xl shadow-lg shadow-teal-600/30 transition-all hover:shadow-xl hover:shadow-teal-600/40"
                  onClick={() => setIsbooking(true)}
                >
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
                    className="rounded-2xl w-full h-auto aspect-square object-cover"
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

        <div className="hidden md:block">
          <SearchSection 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            selectedCategory={selectedCategory}
            handleCategoryFilter={handleCategoryFilter}
            handleClinicClick={handleClinicClick}
            searchResults={filteredResults}
            categories={categories ?? []}
          />
        </div>

        <CategoriesSection />
        <div className="md:hidden block">
          <ClinicSection />
        </div>

        <section className="max-w-7xl mx-auto md:py-20 pb-5">
          <div className="md:text-center text-left px-4 md:mb-12 mb-4 hidden md:block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Promo <span className="text-teal-600">Menarik</span>
            </h2>
          </div>

          <div className="flex items-center justify-between mb-4 md:hidden px-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Promo Menarik
            </h2>
          </div>

          <div className="flex overflow-x-auto pb-4">
            <div className="w-screen flex items-center space-x-6 px-4">
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
