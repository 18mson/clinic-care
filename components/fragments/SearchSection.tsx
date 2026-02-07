'use client';

import { Search, Star, MapPin } from 'lucide-react';
import { Input } from '@/components/elements/input';
import { Card } from '@/components/elements/card';
import Image from 'next/image';

interface Clinic {
  id: string;
  name: string;
  category: string;
  address: string;
  image_url: string;
  rating: number;
  totalReviews: number;
}

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  searchResults: Clinic[];
  selectedCategory: string | null;
  handleCategoryFilter: (category: string) => void;
  handleClinicClick: (clinicId: string) => void;
}

export function SearchSection({
  searchQuery,
  setSearchQuery,
  showSuggestions,
  setShowSuggestions,
  searchResults,
  selectedCategory,
  handleCategoryFilter,
  handleClinicClick,
}: SearchSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 md:mt-8 mb-20 hidden md:block">
      <Card className="p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 md:flex hidden text-teal-700">
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
              className="pl-12 pr-4 md:py-6 bg-white text-base border-gray-200 focus:border-teal-500 focus:ring-teal-500 font-semibold"
            />
          </div>

          {showSuggestions && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
              {searchQuery.length > 0 && (
                <>
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">
                            Hasil untuk &quot;{searchQuery}&quot;
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {['Semua', 'Umum', 'Mata', 'Gigi', 'THT'].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => cat !== 'Semua' ? handleCategoryFilter(cat) : handleCategoryFilter('')}
                              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                (cat === 'Semua' && !selectedCategory) || selectedCategory === cat
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-slate-600'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <div className="text-xs text-gray-500 mt-3">
                            {searchResults.length} Ditemukan
                          </div>
                          <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                            Default ↓
                          </button>
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
                    <div className="p-8 text-center text-gray-500">
                      <p>Tidak ada hasil untuk &quot;{searchQuery}&quot;</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
