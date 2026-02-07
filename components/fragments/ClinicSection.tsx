import Image from 'next/image'
import { Heart, Star, MapPin } from 'lucide-react'
import { PLACEHOLDER_IMAGE } from '@/lib/mock/placeholders'

export default function ClinicSection() {
  return (
    <section className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Klinik Terdekat
        </h2>
        <button className="text-sm text-teal-600 font-medium">
          Lihat semua
        </button>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="min-w-[260px] bg-white rounded-2xl shadow border border-gray-200"
          >
            {/* Image */}
            <div className="relative h-36 w-full">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Hospital"
                fill
                className="object-cover rounded-t-2xl"
              />
              <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full">
                <Heart className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                Mayapada Hospital Kuningan
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-gray-800">5.0</span>
                <span>(582 Reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Jl. H. R. Rasuna Said No.Kav C-17</span>
              </div>

              {/* Distance */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>2.5 km / 40 min</span>
                <span className="flex items-center gap-1">
                  🏥 Rumah Sakit
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}