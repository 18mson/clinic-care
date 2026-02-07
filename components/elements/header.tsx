'use client';

import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  isScrolled: boolean;
}

export function Header({ isScrolled }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 max-w-screen hidden md:block ${
        isScrolled
          ? 'bg-white border-b border-gray-200 shadow-sm'
          : 'bg-transparent bg-linear-to-r from-teal-500 to-teal-700 md:from-white md:to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Stethoscope className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-gray-800">CliniCare</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors text-sm font-medium">
              Beranda
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors text-sm">
              Layanan
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors text-sm">
              Cari Klinik
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors text-sm">
              Tentang Kami
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors text-sm">
              Blog
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors text-sm">
              Hubungi Kami
            </a>
          </nav>

          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
