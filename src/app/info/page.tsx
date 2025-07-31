'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowRightIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PlayIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  BeakerIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  source: string;
  type: 'article' | 'podcast' | 'video' | 'paper';
  url: string;
  description: string;
}

export default function InfoPage() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>('fundamentals');

  const topics = [
    {
      id: 'fundamentals',
      title: 'Quantum Fundamentals',
      icon: AcademicCapIcon,
      description: 'Basic concepts and principles'
    },
    {
      id: 'technology',
      title: 'Quantum Technology',
      icon: CogIcon,
      description: 'Hardware and engineering advances'
    },
    {
      id: 'algorithms',
      title: 'Quantum Algorithms',
      icon: ChartBarIcon,
      description: 'Computational methods and applications'
    },
    {
      id: 'research',
      title: 'Research & Development',
      icon: BeakerIcon,
      description: 'Latest scientific discoveries'
    }
  ];

     const articles: Record<string, Article[]> = {
     fundamentals: [
       {
         id: '1',
         title: 'Understanding Quantum Superposition',
         source: 'Nature',
         type: 'article',
         url: 'https://www.nature.com/articles/s41567-020-01147-2',
         description: 'A comprehensive guide to quantum superposition principles'
       },
       {
         id: '2',
         title: 'Quantum Entanglement Explained',
         source: 'Scientific American',
         type: 'article',
         url: 'https://www.scientificamerican.com/article/quantum-entanglement/',
         description: 'How quantum entanglement works and its implications'
       },
               {
          id: '3',
          title: 'The Year in Quantum: Preparing for the quantum revolution',
          source: 'MIT Open Learning',
          type: 'podcast',
          url: 'https://medium.com/open-learning/the-year-in-quantum-preparing-for-the-quantum-revolution-9b81ae18ec6b',
          description: 'Weekly discussions on quantum computing basics'
        }
     ],
     technology: [
               {
          id: '4',
          title: 'IBM Quantum Platform',
          source: 'IBM',
          type: 'article',
          url: 'https://www.ibm.com/quantum',
          description: 'Access the world\'s largest fleet of utility-scale quantum computers'
        },
       {
         id: '5',
         title: 'Google Quantum Supremacy',
         source: 'The New York Times',
         type: 'article',
         url: 'https://www.nytimes.com/2019/10/23/technology/quantum-computing-google.html',
         description: 'Google\'s quantum supremacy achievement explained'
       },
       {
         id: '6',
         title: 'Quantum Hardware Deep Dive',
         source: 'IEEE Spectrum',
         type: 'video',
         url: 'https://spectrum.ieee.org/quantum-computing',
         description: 'Technical overview of quantum computer hardware'
       }
     ],
     algorithms: [
       {
         id: '7',
         title: 'Shor\'s Algorithm Implementation',
         source: 'arXiv',
         type: 'paper',
         url: 'https://arxiv.org/abs/quant-ph/9508027',
         description: 'Recent advances in Shor\'s factoring algorithm'
       },
       {
         id: '8',
         title: 'Quantum Machine Learning',
         source: 'Nature Machine Intelligence',
         type: 'article',
         url: 'https://www.nature.com/articles/s42256-020-00261-3',
         description: 'The intersection of quantum computing and AI'
       },
       {
         id: '9',
         title: 'Grover\'s Algorithm in Practice',
         source: 'Quantum Computing Report',
         type: 'podcast',
         url: 'https://quantumcomputingreport.com/',
         description: 'Real-world applications of Grover\'s algorithm'
       }
     ],
     research: [
               {
          id: '10',
          title: 'IBM Says It\'s Cracked Quantum Error Correction',
          source: 'IEEE Spectrum',
          type: 'article',
          url: 'https://spectrum.ieee.org/ibm-quantum-error-correction-starling',
          description: 'New quantum error correction methods'
        },
       {
         id: '11',
         title: 'Topological Quantum Computing',
         source: 'Physical Review Letters',
         type: 'paper',
         url: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.103.020502',
         description: 'Advances in topological quantum computing'
       },
       {
         id: '12',
         title: 'Quantum Internet Research',
         source: 'Nature Communications',
         type: 'article',
         url: 'https://www.nature.com/articles/s41467-020-19446-w',
         description: 'Building the quantum internet infrastructure'
       }
     ]
   };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <NewspaperIcon className="w-4 h-4" />;
      case 'podcast':
        return <PlayIcon className="w-4 h-4" />;
      case 'video':
        return <VideoCameraIcon className="w-4 h-4" />;
      case 'paper':
        return <DocumentTextIcon className="w-4 h-4" />;
      default:
        return <NewspaperIcon className="w-4 h-4" />;
    }
  };

  const handleExploreClick = () => {
    window.open('https://www.technologyreview.com/2025/01/27/1110540/useful-quantum-computing-is-inevitable-and-increasingly-imminent/', '_blank');
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
              <h1 className="text-xl font-medium text-gray-600">Info</h1>
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

        {/* Hero Section with Quantum Computer Image */}
        <div className="relative mb-8">
          <Image
            src="/quantum-computer.jpg"
            alt="Quantum Computer"
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Explore</h2>
                <p className="text-white/90">The latest in quantum computing research and technology</p>
              </div>
              <button
                onClick={handleExploreClick}
                className="inline-flex items-center space-x-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <span>See MIT Technology Review</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

                 {/* Topics Section */}
         <div className="mb-8">
           <h3 className="text-xl font-semibold text-gray-800 mb-6">Discover</h3>
           <div className="flex flex-wrap gap-3">
             {topics.map((topic) => (
               <button
                 key={topic.id}
                                   onClick={() => setSelectedTopic(topic.id)}
                                   className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                    selectedTopic === topic.id
                      ? 'border-sky-400 bg-sky-400 text-white'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
                  }`}
               >
                 <span className="font-medium text-sm">{topic.title}</span>
               </button>
             ))}
           </div>
         </div>

        {/* Articles Section */}
        {selectedTopic && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {topics.find(t => t.id === selectedTopic)?.title} - Latest Content
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles[selectedTopic]?.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(article.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{article.title}</h4>
                      <p className="text-sm text-sky-600 font-medium">{article.source}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                                     <button 
                     onClick={() => window.open(article.url, '_blank')}
                     className="text-sky-400 hover:text-sky-500 text-sm font-medium flex items-center space-x-1"
                   >
                     <span>Read more</span>
                     <ArrowRightIcon className="w-3 h-3" />
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 