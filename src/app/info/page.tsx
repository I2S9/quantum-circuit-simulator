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

        {/* Quantum Computing Learning Roadmap */}
        <div className="mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quantum Computing Learning Roadmap</h3>
            <p className="text-sm text-gray-600">
              Master quantum computing step by step with our comprehensive learning path designed for beginners to advanced learners
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-sky-400 rounded-full"></div>

                         {/* Phase 1: Foundations */}
             <div className="relative flex items-start mb-16">
               <div className="absolute left-0 top-6 w-6 h-6 bg-sky-400 rounded-full transform -translate-x-2 border-4 border-white shadow-lg"></div>
               <div className="ml-8 flex-1">
                 <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-sky-400 rounded-xl flex items-center justify-center mr-6">
                      <AcademicCapIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Phase 1: Foundations</h4>
                      <p className="text-sky-600 font-medium text-sm">2-3 months • Beginner</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-3 text-base">Core Concepts</h5>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum bits (qubits) vs classical bits</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Superposition and entanglement</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum measurement and collapse</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum gates and circuits</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-3 text-base">Learning Goals</h5>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Understand quantum mechanics basics</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Build simple quantum circuits</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Use quantum simulators</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Complete hands-on exercises</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://qiskit.org/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Qiskit</a>
                    <a href="https://quantum-computing.ibm.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">IBM Quantum</a>
                    <a href="https://www.khanacademy.org/math/linear-algebra" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Linear Algebra</a>
                  </div>
                </div>
              </div>
            </div>

                         {/* Phase 2: Algorithms */}
             <div className="relative flex items-start mb-16">
               <div className="absolute left-0 top-6 w-6 h-6 bg-sky-400 rounded-full transform -translate-x-2 border-4 border-white shadow-lg"></div>
               <div className="ml-8 flex-1">
                 <div className="bg-sky-50 border border-sky-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-sky-400 rounded-xl flex items-center justify-center mr-6">
                      <ChartBarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Phase 2: Quantum Algorithms</h4>
                      <p className="text-sky-600 font-medium text-sm">3-4 months • Intermediate</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-6 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-4 text-base">Key Algorithms</h5>
                      <ul className="text-gray-600 space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Deutsch-Jozsa algorithm</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Grover's search algorithm</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum Fourier Transform</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Shor's factoring algorithm</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-4 text-base">Learning Goals</h5>
                      <ul className="text-gray-600 space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Implement quantum algorithms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Understand quantum complexity</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Analyze algorithm performance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Solve real-world problems</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://qiskit.org/textbook/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Quantum Circuits</a>
                    <a href="https://quantum-computing.ibm.com/composer/docs/iqx/guide/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Algorithm Design</a>
                    <a href="https://www.cs.cmu.edu/~odonnell/quantum15/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Complexity Theory</a>
                  </div>
                </div>
              </div>
            </div>

                         {/* Phase 3: Advanced Topics */}
             <div className="relative flex items-start mb-16">
               <div className="absolute left-0 top-6 w-6 h-6 bg-sky-400 rounded-full transform -translate-x-2 border-4 border-white shadow-lg"></div>
               <div className="ml-8 flex-1">
                 <div className="bg-sky-50 border border-sky-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-sky-400 rounded-xl flex items-center justify-center mr-6">
                      <BeakerIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Phase 3: Advanced Topics</h4>
                      <p className="text-sky-600 font-medium text-sm">4-6 months • Advanced</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-6 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-4 text-base">Advanced Concepts</h5>
                      <ul className="text-gray-600 space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum error correction</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum machine learning</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum cryptography</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum optimization</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-4 text-base">Learning Goals</h5>
                      <ul className="text-gray-600 space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Research quantum applications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Contribute to quantum projects</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Understand quantum hardware</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Explore quantum software</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://qiskit.org/textbook/ch-quantum-hardware/error-correction-repetition-code.html" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Error Correction</a>
                    <a href="https://qiskit.org/textbook/ch-machine-learning/machine-learning.html" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Quantum ML</a>
                    <a href="https://arxiv.org/list/quant-ph/recent" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Research</a>
                  </div>
                </div>
              </div>
            </div>

                         {/* Phase 4: Specialization */}
             <div className="relative flex items-start">
               <div className="absolute left-0 top-6 w-6 h-6 bg-sky-400 rounded-full transform -translate-x-2 border-4 border-white shadow-lg"></div>
               <div className="ml-8 flex-1">
                 <div className="bg-sky-50 border border-sky-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-sky-400 rounded-xl flex items-center justify-center mr-6">
                      <CogIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Phase 4: Specialization</h4>
                      <p className="text-sky-600 font-medium text-sm">6+ months • Expert</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-6 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-4 text-base">Specializations</h5>
                      <ul className="text-gray-600 space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum hardware engineering</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum software development</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum algorithm research</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum business applications</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-sky-100">
                      <h5 className="font-semibold text-gray-800 mb-4 text-base">Career Paths</h5>
                      <ul className="text-gray-600 space-y-3 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum researcher</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum software engineer</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum consultant</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Quantum entrepreneur</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://quantum-journal.org/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Research</a>
                    <a href="https://github.com/Qiskit" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Development</a>
                    <a href="https://quantum-computing.ibm.com/lab" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-200 transition-colors">Innovation</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="mt-16 bg-sky-400 rounded-xl p-10 border border-sky-200">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">Recommended Learning Resources</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 border border-sky-100">
                <h5 className="font-bold text-gray-800 mb-4 text-lg">Books & Courses</h5>
                <ul className="text-gray-600 space-y-3 text-base">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://mitpress.mit.edu/books/quantum-computing-everyone" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">"Quantum Computing for Everyone" by Chris Bernhardt</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://quantum-computing.ibm.com/learn" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">IBM Quantum Experience (free courses)</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://qiskit.org/textbook/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Qiskit Textbook (online)</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-845-quantum-complexity-theory-fall-2010/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">MIT OpenCourseWare Quantum Computing</a>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 border border-sky-100">
                <h5 className="font-bold text-gray-800 mb-4 text-lg">Online Platforms</h5>
                <ul className="text-gray-600 space-y-3 text-base">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://quantum-computing.ibm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">IBM Quantum Experience</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://docs.microsoft.com/en-us/azure/quantum/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Microsoft Quantum Development Kit</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://quantumai.google/cirq" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Google Cirq</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://aws.amazon.com/braket/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Amazon Braket</a>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 border border-sky-100">
                <h5 className="font-bold text-gray-800 mb-4 text-lg">Academic Programs</h5>
                <ul className="text-gray-600 space-y-3 text-base">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-845-quantum-complexity-theory-fall-2010/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">MIT Quantum Computing Course</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://quantum.stanford.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">Stanford Quantum Computing</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://uwaterloo.ca/institute-for-quantum-computing/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">University of Waterloo IQC</a>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <a href="https://quantum.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">UC Berkeley Quantum Information</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 