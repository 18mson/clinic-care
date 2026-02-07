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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Kategori <span className="text-teal-600">Klinik</span>
        </h2>
      </div>

      <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
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
                <div className={`w-28 h-28 rounded-full ${categoryMeta.color} flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg`}>
                  <Icon className="h-12 w-12" />
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
