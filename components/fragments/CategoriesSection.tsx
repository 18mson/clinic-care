'use client';

import { Eye, Heart, Activity, Ear, Building } from 'lucide-react';
import type { ComponentType } from 'react';
import { useCategories } from '@/lib/hooks';

const categoryIconMap: Record<string, { icon: ComponentType<{ className?: string }>; color: string }> = {
  'Semua': { icon: Building, color: 'bg-teal-100 text-teal-600' },
  'Umum': { icon: Building, color: 'bg-teal-100 text-teal-600' },
  'Mata': { icon: Eye, color: 'bg-cyan-100 text-cyan-600' },
  'Gigi': { icon: Heart, color: 'bg-sky-100 text-sky-600' },
  'Fisioterapi': { icon: Activity, color: 'bg-teal-100 text-teal-600' },
  'THT': { icon: Ear, color: 'bg-cyan-100 text-cyan-600' },
};

export function CategoriesSection() {
  const { categories, categoriesError, categoriesLoading } = useCategories();

  // Prevent hydration mismatch by not rendering until mounted
  if (!categories && !categoriesLoading && !categoriesError) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-20 py-5 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Kategori <span className="text-teal-600">Klinik</span>
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6" />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-20 py-0 bg-white">
      <div className="md:text-center text-left md:mb-12 mb-4 hidden md:block">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Kategori <span className="text-teal-600">Klinik</span>
        </h2>
      </div>
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h2 className="text-lg font-semibold text-gray-900">
        Kategori Klinik
        </h2>
        <button className="text-sm text-teal-600 font-medium">
          Lihat semua
        </button>
      </div>

      <div className="flex md:justify-center md:items-center gap-2 md:gap-8 flex-wrap">
        {categoriesLoading ? (
          <div className="col-span-4 md:col-span-8 text-center">
            <p className="text-gray-500">Loading categories...</p>
          </div>
        ) : categoriesError ? (
          <div className="col-span-4 md:col-span-8 text-center">
            <p className="text-red-500">Error loading categories</p>
          </div>
        ) : (
          categories?.map((category) => {
            const categoryMeta = categoryIconMap[category.name] || categoryIconMap['Umum'];
            const Icon = categoryMeta.icon;
            return (
              <button
                key={category.id}
                className="flex flex-col items-center space-y-3 group cursor-pointer"
              >
                <div className={`md:w-28 md:h-28 rounded-full ${categoryMeta.color} flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg`}>
                  <Icon className="md:h-12 md:w-12 h-10 w-10" />
                </div>
                <span className="text-sm font-medium text-teal-600 group-hover:text-teal-700 transition-colors">
                  {category.name}
                </span>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
