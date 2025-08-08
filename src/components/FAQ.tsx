'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Qubitly?",
    answer: "Qubitly is a comprehensive quantum computing learning platform that combines visual circuit building, AI-powered assistance, and real-time simulation to help you understand and explore quantum computing concepts."
  },
  {
    question: "How does the Quantum Circuit Builder work?",
    answer: "Our drag-and-drop interface allows you to build quantum circuits visually. Simply drag quantum gates onto the circuit, connect them, and run simulations to see how they affect qubit states in real-time."
  },
  {
    question: "What is AskQ and how can it help me?",
    answer: "AskQ is our AI-powered quantum computing assistant. You can ask questions about quantum concepts, get circuit suggestions, debug your designs, or learn about quantum algorithms through natural conversation."
  },
  {
    question: "Is Qubitly free to use?",
    answer: "Yes! Qubitly is completely free and designed for educational purposes. We believe that quantum computing education should be accessible to everyone, from beginners to advanced learners."
  },
  {
    question: "Do I need prior quantum computing knowledge?",
    answer: "No prior knowledge is required! Qubitly is designed to be beginner-friendly with interactive tutorials, visual explanations, and an AI assistant that can help you understand complex concepts step by step."
  },
  {
    question: "What quantum gates are available in the circuit builder?",
    answer: "We support all standard quantum gates including Hadamard (H), Pauli-X/Y/Z, CNOT, SWAP, Phase gates, and more. Each gate comes with visual feedback and explanations of its effects."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-[1100px] mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">FAQ</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-800 text-lg pr-4">{item.question}</h3>
              {openItems.includes(index) ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
