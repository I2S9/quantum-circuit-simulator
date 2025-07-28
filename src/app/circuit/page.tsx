'use client';

import Image from 'next/image';
import {
  InformationCircleIcon,
  ChevronLeftIcon,
  Squares2X2Icon,
  FunnelIcon,
  PlayIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  MinusIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CircuitPage() {
  const router = useRouter();
  const [qasmCode, setQasmCode] = useState(`OPENQASM 3;
include 'customgates.inc';
bit[5] c;
qubit[5] q;
swap q[1], q[2];
tdg q[0];
c[0] = measure q[0];
c[1] = measure q[1];
c[2] = measure q[2];
c[3] = measure q[3];
c[4] = measure q[4];`);
  
  const [qubitCount, setQubitCount] = useState(4);
  const [circuitGates, setCircuitGates] = useState<Array<Array<{gate: string, position: number}>>>([]);
  const [simulationResults, setSimulationResults] = useState<{[key: string]: number}>({});
  const [isSimulating, setIsSimulating] = useState(false);

  const gates = [
    { gates: ['H', 'T', 'T†'], borderColor: 'border-orange-400' },
    { gates: ['CX', 'CY', 'CZ'], borderColor: 'border-blue-400' },
    { gates: ['X', 'Y', 'Z'], borderColor: 'border-green-400' },
    { gates: ['√X', '√Z', 'CP'], borderColor: 'border-purple-400' },
    { gates: ['CSWAP', 'CH', 'Rx'], borderColor: 'border-purple-500' },
    { gates: ['Ry', 'Rz', 'P'], borderColor: 'border-gray-400' },
    { gates: ['CP', 'CP', 'I'], borderColor: 'border-gray-500' },
    { gates: ['⋮'], borderColor: 'border-gray-500' }
  ];

  const handleDragStart = (e: React.DragEvent, gate: string) => {
    e.dataTransfer.setData('text/plain', gate);
  };



  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const generateQasmCode = () => {
    let code = 'OPENQASM 3;\ninclude \'customgates.inc\';\n\n';
    code += `bit[${qubitCount}] c;\n`;
    code += `qubit[${qubitCount}] q;\n\n`;
    
    // Add gates based on circuit
    circuitGates.forEach((qubitGates, qubitIndex) => {
      if (qubitGates) {
        qubitGates.forEach(gateInfo => {
          code += `${gateInfo.gate.toLowerCase()} q[${qubitIndex}];\n`;
        });
      }
    });
    
    code += '\n';
    // Add measurements
    for (let i = 0; i < qubitCount; i++) {
      code += `c[${i}] = measure q[${i}];\n`;
    }
    
    return code;
  };

    const simulateCircuit = () => {
    setIsSimulating(true);

    // Simulate circuit and generate random results
    setTimeout(() => {
      const results: {[key: string]: number} = {};
      const maxShots = 1000;

      // Generate random measurement results
      for (let i = 0; i < Math.pow(2, qubitCount); i++) {
        const binary = i.toString(2).padStart(qubitCount, '0');
        results[binary] = Math.floor(Math.random() * maxShots);
      }

      // Normalize to 100%
      const total = Object.values(results).reduce((sum, val) => sum + val, 0);
      Object.keys(results).forEach(key => {
        results[key] = Math.round((results[key] / total) * 100);
      });

      setSimulationResults(results);
      setIsSimulating(false);
    }, 1000);
  };

  const resetCircuit = () => {
    setCircuitGates([]);
    setSimulationResults({});
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
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

            {/* Page Title - Center */}
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-medium text-gray-600">Quantum Circuit Simulator</h1>
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

        {/* Main Circuit Interface */}
        <div className="grid grid-cols-12 gap-6 mb-6">
                    {/* Left Panel: Gates */}
          <div className="bg-white border border-gray-200 rounded-lg w-fit col-span-2">
            {/* Gates Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-sky-100">
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              <h2 className="font-bold text-gray-800">Gates</h2>
              <div className="flex items-center space-x-2">
                <Squares2X2Icon className="w-4 h-4 text-gray-600" />
                <InformationCircleIcon className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            
            {/* Gates Grid */}
            <div className="p-4">
              <div className="flex flex-col space-y-2">
                {gates.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex space-x-2">
                    {row.gates.map((gate, gateIndex) => (
                      <button
                        key={`${rowIndex}-${gateIndex}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, gate)}
                        className={`w-12 h-12 bg-white border ${row.borderColor} rounded flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing p-0`}
                      >
                                         {gate === 'CX' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <span className="text-xs">X</span>
                         </div>
                       </div>
                     )}
                     {gate === 'CY' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <span className="text-xs">Y</span>
                         </div>
                       </div>
                     )}
                     {gate === 'CZ' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <span className="text-xs">Z</span>
                         </div>
                       </div>
                     )}
                     {gate === 'CNOT' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <span className="text-xs">⊕</span>
                         </div>
                       </div>
                     )}
                     {gate === 'SWAP' && (
                       <div className="flex items-center justify-center">
                         <div className="w-6 h-0.5 bg-black transform rotate-45"></div>
                         <div className="w-6 h-0.5 bg-black transform -rotate-45"></div>
                       </div>
                     )}
                     {gate === 'CP' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <span className="text-xs">P</span>
                         </div>
                       </div>
                     )}
                     {gate === 'CSWAP' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <div className="w-3 h-0.5 bg-black transform rotate-45"></div>
                           <div className="w-3 h-0.5 bg-black transform -rotate-45"></div>
                         </div>
                       </div>
                     )}
                     {gate === 'CH' && (
                       <div className="flex flex-col items-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-4 h-0.5 bg-black"></div>
                         <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
                           <span className="text-xs">H</span>
                         </div>
                       </div>
                     )}
                    {gate === '⋮' && (
                      <EllipsisVerticalIcon className="w-6 h-6 text-gray-500" />
                    )}
                    {!['CX', 'CY', 'CZ', 'CNOT', 'SWAP', 'CP', 'CSWAP', 'CH', '⋮'].includes(gate) && (
                      <span>{gate}</span>
                    )}
                  </button>
                ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Panel: Quantum Circuit */}
          <div className="bg-white border border-gray-200 rounded-lg col-span-7">
                               {/* Circuit Header */}
                   <div className="flex items-center justify-between p-4 border-b border-gray-200">
                     <h2 className="font-semibold text-gray-800">Quantum circuit</h2>
                     <div className="flex items-center space-x-2">
                       <button
                         onClick={simulateCircuit}
                         disabled={isSimulating}
                         className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                       >
                         <PlayIcon className="w-4 h-4" />
                         <span>{isSimulating ? 'Simulating...' : 'Simulate'}</span>
                       </button>
                       <button
                         onClick={resetCircuit}
                         className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                         title="Reset circuit"
                       >
                         <ArrowPathIcon className="w-4 h-4" />
                         <span>Restart</span>
                       </button>
                     </div>
                   </div>
            
                         {/* Circuit Canvas */}
             <div 
               className="p-4 min-h-[400px] bg-gray-50"
               onDragOver={handleDragOver}
             >
                                            {/* Qubit Lines */}
               <div className="space-y-6">
                 {Array.from({ length: qubitCount }, (_, index) => (
                   <div key={index} className="flex items-center">
                     <span className="text-sm text-gray-600 w-12">q[{index}]</span>
                     <div 
                       className="flex-1 h-8 bg-gray-100 relative border-2 border-dashed border-gray-300"
                       onDrop={(e) => {
                         e.preventDefault();
                         const gate = e.dataTransfer.getData('text/plain');
                         const rect = e.currentTarget.getBoundingClientRect();
                         const x = e.clientX - rect.left;
                         const position = Math.floor(x / 50);
                         
                         setCircuitGates(prev => {
                           const newGates = [...prev];
                           if (!newGates[index]) {
                             newGates[index] = [];
                           }
                           
                           // Check if position is already occupied
                           const existingGate = newGates[index].find(g => g.position === position);
                           if (!existingGate) {
                             newGates[index].push({ gate, position });
                           }
                           return newGates;
                         });
                       }}
                       onDragOver={handleDragOver}
                       onDragEnter={(e) => {
                         e.currentTarget.classList.add('bg-blue-50', 'border-blue-300');
                       }}
                       onDragLeave={(e) => {
                         e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300');
                       }}
                     >
                       {/* Existing gates on this qubit */}
                       {circuitGates[index]?.map((gateInfo, gateIndex) => (
                         <div
                           key={gateIndex}
                           className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-gray-50"
                           style={{ left: `${gateInfo.position * 50}px` }}
                           onClick={() => {
                             setCircuitGates(prev => {
                               const newGates = [...prev];
                               newGates[index] = newGates[index].filter((_, i) => i !== gateIndex);
                               return newGates;
                             });
                           }}
                           title="Click to remove"
                         >
                           {gateInfo.gate}
                         </div>
                       ))}
                       {/* Measurement icon at the end */}
                       <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                         <div className="w-2.5 h-2.5 bg-sky-700 rounded-full"></div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
               
               {/* Controls */}
               <div className="flex items-center space-x-2 mt-6">
                 <button 
                   className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                   onClick={() => setQubitCount(prev => Math.min(prev + 1, 10))}
                 >
                   <PlusIcon className="w-3 h-3 text-gray-600" />
                 </button>
                 <button 
                   className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
                   onClick={() => setQubitCount(prev => Math.max(prev - 1, 1))}
                 >
                   <MinusIcon className="w-3 h-3 text-gray-600" />
                 </button>
               </div>
            </div>
          </div>

          {/* Right Panel: QASM Code */}
          <div className="bg-white border border-gray-200 rounded-lg col-span-3">
            {/* QASM Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-sky-100">
              <h2 className="font-bold text-gray-800">&gt; QASM code</h2>
              <QuestionMarkCircleIcon className="w-4 h-4 text-gray-600" />
            </div>
            
                                     {/* QASM Code Display */}
            <div className="p-4">
              <div className="bg-gray-50 rounded p-3 font-mono text-sm cursor-text select-text">
                <div className="flex">
                  {/* Line numbers */}
                  <div className="text-gray-500 mr-4 select-none">
                    {generateQasmCode().split('\n').map((_, index) => (
                      <div key={index} className="text-xs w-6 text-right h-4 flex items-center justify-end">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  {/* Code textarea */}
                  <textarea
                    value={generateQasmCode()}
                    onChange={(e) => setQasmCode(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none resize-none font-mono text-sm text-gray-800"
                    rows={14}
                    spellCheck={false}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Histogram */}
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Histogram Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Histogram</h2>
            <div className="flex items-center space-x-2">
              <MinusIcon className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          
          {/* Histogram Chart */}
          <div className="p-4">
            <div className="h-64 flex items-end space-x-2">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-full text-xs text-gray-500 mr-2">
                {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
              
              {/* Chart area */}
              <div className="flex-1 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((line) => (
                    <div 
                      key={line} 
                      className="absolute w-full h-px bg-gray-200"
                      style={{ top: `${line * 10}%` }}
                    ></div>
                  ))}
                </div>
                
                                 {/* Bars */}
                 {Object.entries(simulationResults).map(([state, probability], index) => (
                   <div
                     key={state}
                     className="absolute bottom-0 bg-sky-400"
                     style={{
                       left: `${(index / (Object.keys(simulationResults).length - 1)) * 100}%`,
                       width: `${100 / Object.keys(simulationResults).length}%`,
                       height: `${probability}%`
                     }}
                   />
                 ))}
                
                                 {/* X-axis labels */}
                 <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                   {Object.keys(simulationResults).map((state, index) => (
                     <span 
                       key={state} 
                       className="transform -rotate-45 origin-left" 
                       style={{ left: `${(index / (Object.keys(simulationResults).length - 1)) * 100}%` }}
                     >
                       {state}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 