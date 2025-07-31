'use client';

import Image from 'next/image';
import { 
  PaperAirplaneIcon, 
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between relative">
            {/* Logo and Qubitly - Left */}
            <button 
              className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => router.push('/')}
            >
              <Image
                src="/logo.png"
                alt="Qubitly Logo"
                width={40}
                height={40}
              />
              <span className="font-bold text-lg text-black">Qubitly</span>
            </button>
            
            {/* Page Title - Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-medium text-gray-600">About Us</h1>
            </div>
            
            {/* Info button - Right */}
            <button 
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => router.push('/info')}
            >
              <InformationCircleIcon className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl p-6 max-w-[1100px] mx-auto mb-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Icon Circle */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Qubitly Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            
            {/* Text and Button Container */}
            <div className="flex items-center justify-between w-full mt-4">
              {/* Text - Left */}
              <div className="text-white">
                <h2 className="text-2xl font-medium">Qubitly helps you learn quantum computing!</h2>
              </div>
              
              {/* Start Button - Right */}
              <button 
                className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-50 transition-colors flex items-center space-x-2 cursor-pointer"
                onClick={() => router.push('/circuit')}
              >
                <span className="font-semibold">Start</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1100px] mx-auto space-y-6 text-gray-800">
          <p className="text-base leading-relaxed">
            Welcome to Qubitly! We are here to help everyone learn and explore quantum computing in an accessible and engaging way.
          </p>
          
          <p className="text-base leading-relaxed">
            According to recent studies, quantum computing is expected to revolutionize industries from cryptography to drug discovery, with the global quantum computing market projected to reach $65 billion by 2030.
          </p>
          
          <p className="text-base leading-relaxed">
            At Qubitly, we believe everyone should have easy and accessible access to quantum computing education. This is why we provide a free interactive quantum circuit simulator, an AI-powered chat assistant, and comprehensive learning resources for accurate and safe quantum computing knowledge.
          </p>
          
          <p className="text-base leading-relaxed">
            To increase accessibility, we provide two different options for learning: custom text input through our AI chat and the selection of guided prompts through a simple click interface.
          </p>
          
          <p className="text-base leading-relaxed">
            This platform is completely free and designed for learning. We highly value the educational experience of our users and provide a safe environment for exploring quantum computing concepts.
          </p>
          
          <p className="text-base leading-relaxed font-bold">
            Qubitly is accessible, educational, and essential for the future of computing.
          </p>
        </div>
      </div>
    </div>
  );
} 