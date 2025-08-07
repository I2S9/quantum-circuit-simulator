'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { 
  PaperAirplaneIcon, 
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function LiveChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestedPrompts = [
    'Explain quantum superposition in simple terms',
    'How does a Hadamard gate affect a |0> qubit?',
    "What's the intuition behind entanglement?",
    "How does Grover's algorithm achieve quadratic speedup?",
    'What is the role of measurement in quantum circuits?'
  ];

  // Initialize messages after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: "Hi! I'm QubitlyAi, your quantum computing assistant. Feel free to ask me anything about quantum computing, algorithms, gates, or any quantum-related topics. What would you like to explore today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);

  // If a suggested prompt comes via query param, prefill and auto-send
  useEffect(() => {
    const suggested = searchParams.get('prompt');
    if (suggested && suggested.trim()) {
      setInputMessage(suggested);
      // Auto-send shortly after mount to let state settle
      const timer = setTimeout(() => {
        handleSendMessage(suggested);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? inputMessage).trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await response.json();
      const aiText = data?.text || data?.error || 'Sorry, something went wrong.';
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (e) {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Network error while contacting the AI service.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

        {/* Suggested Prompts */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-2 text-sm text-gray-600">Suggested prompts</div>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-3 py-1.5 text-sm rounded-full border border-gray-200 hover:bg-sky-50 hover:border-sky-200 text-gray-700"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[70%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser ? 'bg-sky-400' : 'bg-white border border-gray-200'
                  }`}>
                    {message.isUser ? (
                      <span className="text-white text-base font-medium">U</span>
                    ) : (
                      <Image
                        src="/logo.png"
                        alt="Qubitly Logo"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-sky-400 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-sky-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Qubitly Logo"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Chat Input Bar - Fixed at bottom */}
      <div className="fixed bottom-20 left-0 right-0 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            {/* Text Input */}
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="w-12 h-12 bg-sky-400 hover:bg-sky-500 disabled:bg-sky-400 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default function LiveChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white p-8">
          <div className="max-w-6xl mx-auto">Loading chat…</div>
        </div>
      }
    >
      <LiveChatContent />
    </Suspense>
  );
}