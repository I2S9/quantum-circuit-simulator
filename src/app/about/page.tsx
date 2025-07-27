'use client';

import Image from 'next/image';
import { 
  PaperAirplaneIcon, 
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            {/* Logo and Qubitly - Left */}
            <div className="flex items-center space-x-1">
              <Image
                src="/logo.png"
                alt="Qubitly Logo"
                width={40}
                height={40}
              />
              <span className="font-bold text-lg text-black">Qubitly</span>
            </div>
            
            {/* Page Title - Center */}
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-medium text-gray-600">About Us</h1>
            </div>
            
            {/* Info button - Right */}
            <button 
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => console.log('Info button clicked')}
            >
              <InformationCircleIcon className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>


      </div>
    </div>
  );
} 