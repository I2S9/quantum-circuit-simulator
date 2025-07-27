'use client';

import { 
  HomeIcon, 
  Square3Stack3DIcon, 
  ChatBubbleLeftRightIcon, 
  InformationCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'circuit', label: 'Circuit', icon: Square3Stack3DIcon },
  { id: 'chat', label: 'Chat', icon: ChatBubbleLeftRightIcon },
  { id: 'info', label: 'Info', icon: InformationCircleIcon },
  { id: 'about', label: 'About Us', icon: UserIcon },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (itemId: string) => {
    switch (itemId) {
      case 'home':
        router.push('/');
        break;
      case 'circuit':
        router.push('/circuit');
        break;
      case 'chat':
        router.push('/chat');
        break;
      case 'info':
        router.push('/info');
        break;
      case 'about':
        router.push('/about');
        break;
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900 rounded-full px-12 py-1 shadow-lg">
        <div className="flex items-center space-x-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isChat = item.id === 'chat';
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <div className="flex flex-col items-center justify-center h-14">
                  <div className={`flex items-center justify-center ${isChat ? 'bg-sky-400 rounded-full p-3 shadow-md' : 'p-2'}`}>
                    <Icon className={`${isChat ? 'h-6 w-6' : 'h-5 w-5'} text-white`} />
                  </div>
                  {!isChat && (
                    <span className="text-xs font-medium -mt-1 text-white">{item.label}</span>
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