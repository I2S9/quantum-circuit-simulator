'use client';

import Image from 'next/image';
import { 
  PaperAirplaneIcon, 
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  LightBulbIcon,
  AcademicCapIcon,
  BeakerIcon,
  CogIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function PromptsPage() {
  const router = useRouter();

  const promptCategories = [
    {
      title: "Quantum Fundamentals",
      icon: AcademicCapIcon,
      color: "bg-sky-400",
      prompts: [
        "What is quantum superposition and how does it differ from classical states?",
        "Explain quantum entanglement and its implications for computing",
        "How do quantum bits (qubits) work compared to classical bits?",
        "What is quantum tunneling and why is it important?",
        "Explain the concept of quantum measurement and wave function collapse"
      ]
    },
    {
      title: "Quantum Gates & Circuits",
      icon: CogIcon,
      color: "bg-sky-400",
      prompts: [
        "What are the basic quantum gates (H, X, Y, Z) and what do they do?",
        "How do controlled gates like CNOT work in quantum circuits?",
        "Explain the difference between single-qubit and multi-qubit gates",
        "What is a quantum circuit and how do you design one?",
        "How do you implement a quantum algorithm using gates?"
      ]
    },
    {
      title: "Quantum Algorithms",
      icon: LightBulbIcon,
      color: "bg-sky-400",
      prompts: [
        "How does Grover's algorithm work and what is it used for?",
        "Explain Shor's algorithm for factoring large numbers",
        "What is the Quantum Fourier Transform and its applications?",
        "How does quantum machine learning differ from classical ML?",
        "What are quantum variational algorithms?"
      ]
    },
    {
      title: "Quantum Applications",
      icon: BeakerIcon,
      color: "bg-sky-400",
      prompts: [
        "How can quantum computing revolutionize cryptography?",
        "What are the potential applications in drug discovery?",
        "How might quantum computing impact financial modeling?",
        "What are the applications in optimization problems?",
        "How could quantum computing help with climate modeling?"
      ]
    },
    {
      title: "Quantum Technologies",
      icon: ChartBarIcon,
      color: "bg-sky-400",
      prompts: [
        "What are the different types of qubits (superconducting, trapped ions, etc.)?",
        "How do quantum computers handle decoherence and noise?",
        "What is quantum error correction and why is it needed?",
        "How do quantum computers achieve quantum supremacy?",
        "What are the challenges in scaling quantum computers?"
      ]
    },
    {
      title: "Quantum Industry",
      icon: GlobeAltIcon,
      color: "bg-sky-400",
      prompts: [
        "What companies are leading in quantum computing development?",
        "How is quantum computing being used in industry today?",
        "What are the career opportunities in quantum computing?",
        "How much does a quantum computer cost to build and operate?",
        "What is the timeline for practical quantum computing?"
      ]
    }
  ];

  const handlePromptClick = (prompt: string) => {
    // Navigate directly to live chat with the selected prompt
    router.push(`/chat/live?prompt=${encodeURIComponent(prompt)}`);
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

        {/* Welcome Message */}
        <div className="flex items-center space-x-4 mb-8">
          {/* Avatar */}
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
              Choose a topic below to explore specific areas of quantum computing. 
              Each prompt will start a focused conversation with QubitlyAi about that subject.
            </p>
          </div>
        </div>

        {/* Prompt Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptCategories.map((category, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{category.title}</h3>
              </div>
              
              {/* Prompts List */}
              <div className="space-y-3">
                {category.prompts.map((prompt, promptIndex) => (
                  <button
                    key={promptIndex}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-sky-50 hover:border-sky-200 border border-transparent transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <SparklesIcon className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                        {prompt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Chat Options */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/chat')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-sky-400 text-white rounded-lg hover:bg-sky-500 transition-colors"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>Back to Chat Options</span>
          </button>
        </div>
      </div>
    </div>
  );
} 