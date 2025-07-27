'use client';

import Image from 'next/image';
import { 
  PaperAirplaneIcon, 
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function ChatWidget() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            {/* Logo and Qubitly - Left */}
            <button 
              className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => console.log('Qubitly logo clicked')}
            >
              <Image
                src="/logo.png"
                alt="Qubitly Logo"
                width={40}
                height={40}
              />
              <span className="font-bold text-lg text-black">Qubitly</span>
            </button>
            
            {/* Input and send button - Center */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask any question..."
                  className="w-[750px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <button className="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors">
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
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

        {/* Main Chat Area */}
        <div className="bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Icon Circle */}
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Qubitly Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            
            {/* Text and Button Container */}
            <div className="flex items-center justify-between w-full mt-4">
              {/* Text - Left */}
              <div className="text-white">
                <h2 className="text-2xl font-bold">Qubitly helps you learn quantum computing!</h2>
              </div>
              
              {/* Start Button - Right */}
              <button 
                className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-50 transition-colors flex items-center space-x-2 cursor-pointer"
                onClick={() => console.log('Start button clicked')}
              >
                <span className="font-semibold">Start</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 