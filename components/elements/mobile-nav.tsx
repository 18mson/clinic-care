'use client';

import { Book, Home, Mail, User } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center h-16">
        <a href="#" className="flex flex-col items-center justify-center w-full h-full text-gray-700 hover:text-teal-600 transition-colors text-xs font-medium gap-1">
          <Home className="w-5 h-5 fill-teal-600" />
          <span>Beranda</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-600 transition-colors text-xs gap-1">
          <Book className="w-5 h-5" />
          <span>Booking</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-600 transition-colors text-xs gap-1">
          <Mail className="w-5 h-5" />
          <span>Pesan</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-teal-600 transition-colors text-xs gap-1">
          <User className="w-5 h-5" />
          <span>Profil</span>
        </a>
      </div>
    </nav>
  );
}
