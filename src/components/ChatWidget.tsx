'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  PaperAirplaneIcon,
  InformationCircleIcon,
  Square3Stack3DIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import FAQ from './FAQ';

export default function ChatWidget() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Redirect to live chat with the message as a query parameter
      router.push(`/chat/live?prompt=${encodeURIComponent(inputMessage.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-white p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
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

            {/* Input and send button - Center */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask any question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-[750px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <button 
                className="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors"
                onClick={handleSendMessage}
              >
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
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
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Quantum Circuit Builder */}
          <div 
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform perspective-1000"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 10;
              const rotateY = (centerX - x) / 10;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Square3Stack3DIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg mb-2">Quantum Circuit Builder</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Build quantum circuits visually using drag-and-drop logic gates. Simulate them instantly and explore how quantum operations affect qubit states.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: AskQ — Your Quantum AI Assistant */}
          <div 
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform perspective-1000"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 10;
              const rotateY = (centerX - x) / 10;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center flex-shrink-0">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg mb-2">AskQ — Your Quantum AI Assistant</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chat with an AI-powered assistant to learn quantum concepts, get circuit suggestions, or debug your designs in real time.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Live Qubit Visualizer */}
          <div 
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform perspective-1000"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 10;
              const rotateY = (centerX - x) / 10;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center flex-shrink-0">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg mb-2">Live Qubit Visualizer</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Visualize your qubit states dynamically through Bloch spheres and probability histograms to better understand quantum behavior.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
} 