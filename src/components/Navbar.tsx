'use client';

import { 
  HomeIcon, 
  Square3Stack3DIcon, 
  ChatBubbleLeftRightIcon, 
  InformationCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'circuit', label: 'Circuit', icon: Square3Stack3DIcon },
  { id: 'chat', label: 'Chat', icon: ChatBubbleLeftRightIcon },
  { id: 'info', label: 'Info', icon: InformationCircleIcon },
  { id: 'about', label: 'About Us', icon: UserIcon },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('chat');

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900 rounded-full px-8 py-2 shadow-lg">
        <div className="flex items-center space-x-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className="flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <div className={`flex flex-col items-center justify-center ${isActive ? 'bg-sky-400 rounded-full p-3 shadow-md' : ''} mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                  {!isActive && (
                    <span className="text-xs text-white font-medium mt-1">{item.label}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 