'use client';

import Image from 'next/image';
import { 
  PaperAirplaneIcon, 
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
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
              <h1 className="text-xl font-medium text-gray-600">QubitlyAi Chat</h1>
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

        {/* Chat Interface - Restructuré */}
        <div className="flex flex-col space-y-8 px-8">
          {/* Top: Welcome Message */}
          <div className="flex items-center space-x-4">
            {/* Avatar - Rond bleu plus gros */}
            <div className="w-20 h-20 bg-sky-400 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Qubitly Logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
            </div>
            
            {/* Message */}
            <div className="flex-1">
              <p className="text-gray-800 text-lg leading-tight font-sans">
                Hi, I&apos;m QubitlyAi! I&apos;m here to help you explore and learn about quantum computing. 
                Whether you&apos;re a beginner or advanced, I can answer your questions about quantum 
                algorithms, quantum gates, quantum circuits, and much more. Let&apos;s dive into the 
                fascinating world of quantum computing together! Choose your preferred chat option below.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Options - Position statique au-dessus de la navbar */}
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-8">
          <div className="flex space-x-6 w-full">
            {/* Live Chat Button */}
            <button className="bg-white border border-gray-300 rounded-3xl p-4 cursor-pointer flex-1">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sky-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-800 text-base">Live Chat</h3>
                  <p className="text-gray-600 text-xs mt-0.5">
                    Type your own questions and receive answers right away!
                  </p>
                </div>
              </div>
            </button>

            {/* Suggested Prompts Button */}
            <button 
              className="bg-white border border-gray-300 rounded-3xl p-4 cursor-pointer flex-1"
              onClick={() => router.push('/chat/prompts')}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sky-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-800 text-base">Suggested Prompts</h3>
                  <p className="text-gray-600 text-xs mt-0.5">
                    If you don&apos;t feel like typing, this option allows you to select prompts.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 