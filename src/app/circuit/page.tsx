"use client";

import { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeftIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  PlayIcon,
  ArrowPathIcon,
  PlusIcon,
  MinusIcon,
  QuestionMarkCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import OnboardingTour from "@/components/OnboardingTour";
import dynamic from 'next/dynamic';

const Histogram = dynamic(() => import('./Histogram'), { ssr: false });

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
  const [circuitGates, setCircuitGates] = useState<
    Array<Array<{ gate: string; position: number }>>
  >([]);
  const [simulationResults, setSimulationResults] = useState<{
    [key: string]: number;
  }>({});
  const [usePercentage, setUsePercentage] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isClient, setIsClient] = useState(false); // For hydration fix
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isExplaining, setIsExplaining] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const gates = [
    { gates: ["H", "T", "T†"], borderColor: "border-orange-400" },
    { gates: ["CX", "CY", "CZ"], borderColor: "border-blue-400" },
    { gates: ["X", "Y", "Z"], borderColor: "border-green-400" },
    { gates: ["√X", "√Z", "CP"], borderColor: "border-purple-400" },
    { gates: ["CSWAP", "CH", "Rx"], borderColor: "border-purple-500" },
    { gates: ["Ry", "Rz", "P"], borderColor: "border-gray-400" },
    { gates: ["SWAP", "I", "S"], borderColor: "border-gray-500" },
    { gates: ["⋮"], borderColor: "border-gray-500" },
  ];

  const handleDragStart = (e: React.DragEvent, gate: string) => {
    e.dataTransfer.setData("text/plain", gate);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const generateQasmCode = () => {
    let code = "OPENQASM 3;\n\n";
    code += 'include "stdgates.inc";\n\n';
    code += `bit[${qubitCount}] c;\n`;
    code += `qubit[${qubitCount}] q;\n\n`;

    // Add gates based on circuit
    circuitGates.forEach((qubitGates, qubitIndex) => {
      if (qubitGates) {
        qubitGates.forEach((gateInfo) => {
          let gateName = gateInfo.gate.toLowerCase();
          // Handle special gate names and parameters
          if (gateName === "t†") gateName = "tdg";
          if (gateName === "√x") gateName = "sx";
          if (gateName === "√z") gateName = "s"; // S gate is sqrt(Z)
          if (gateName === "i") gateName = "id";

          // Parameterized single-qubit gates: default angles
          if (gateName === "rx") {
            code += `rx(pi/2) q[${qubitIndex}];\n`;
            return;
          }
          if (gateName === "ry") {
            code += `ry(pi/2) q[${qubitIndex}];\n`;
            return;
          }
          if (gateName === "rz") {
            code += `rz(pi/2) q[${qubitIndex}];\n`;
            return;
          }
          if (gateName === "p") {
            code += `p(pi/4) q[${qubitIndex}];\n`;
            return;
          }

          // Two-qubit gates currently need explicit target/control, which the UI doesn't collect yet.
          // To avoid invalid QASM, we skip emitting them for now.
          const twoQ = new Set(["cx", "cy", "cz", "swap", "cswap", "ch", "cp"]);
          if (twoQ.has(gateName)) {
            return;
          }

          code += `${gateName} q[${qubitIndex}];\n`;
        });
      }
    });

    code += "\n";
    // Add measurements
    for (let i = 0; i < qubitCount; i++) {
      code += `c[${i}] = measure q[${i}];\n`;
    }

    return code;
  };

  const simulateCircuit = async () => {
    setIsSimulating(true);
    const code = generateQasmCode();

    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qasm: code }),
      });

      const data = (await res.json()) as { [key: string]: number };

      if (res.ok) {
        // Keep raw counts; we'll compute percentages on the fly for the chart
        setSimulationResults(data);
      } else {
        alert("Simulation failed: " + data.error);
      }
    } catch (err) {
      alert("Server error: " + err);
    } finally {
      setIsSimulating(false);
    }
  };

  const chartData = useMemo(() => {
    const n = Math.max(qubitCount, 1);
    const allStates: string[] = Array.from({ length: 1 << n }, (_, i) => i.toString(2).padStart(n, '0'));
    const total = Object.values(simulationResults).reduce((s, v) => s + v, 0);
    const labels = allStates;
    const values = allStates.map((s) => {
      const v = simulationResults[s] ?? 0;
      return usePercentage && total > 0 ? Math.round((v / total) * 100) : v;
    });
    const yLabel = usePercentage ? 'Percentage (%)' : 'Counts (shots)';
    const yMax = usePercentage ? 100 : 200; // backend uses 200 shots
    return { labels, values, yLabel, total, yMax };
  }, [simulationResults, usePercentage, qubitCount]);

  const explainResultsWithAI = async () => {
    if (Object.keys(simulationResults).length === 0) return;
    setIsExplaining(true);
    setAiExplanation('');

    const code = generateQasmCode();
    const distribution = Object.entries(simulationResults)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([state, prob]) => `${state}: ${prob}%`)
      .join(', ');

    const prompt = `You are a quantum computing assistant. In plain text (no markdown), explain the measurement results of the following quantum circuit. Provide a concise, clear explanation with short paragraphs and blank lines between them.

QASM:
${code}

Results (percentages): ${distribution}`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (res.ok && data?.text) {
        setAiExplanation(data.text);
      } else {
        setAiExplanation(data?.error || 'Unable to get AI explanation.');
      }
    } catch (e) {
      setAiExplanation('Network error while contacting the AI service.');
    } finally {
      setIsExplaining(false);
    }
  };

  const resetCircuit = () => {
    setCircuitGates([]);
    setSimulationResults({});
  };

  const renderGateSymbol = (gate: string) => {
    switch (gate) {
      case "CX":
        return (
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
              <span className="text-xs">⊕</span>
            </div>
          </div>
        );
      case "CY":
        return (
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
              <span className="text-xs">Y</span>
            </div>
          </div>
        );
      case "CZ":
        return (
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
              <span className="text-xs">Z</span>
            </div>
          </div>
        );
      case "SWAP":
        return (
          <div className="flex items-center justify-center relative">
            <div className="w-4 h-0.5 bg-black transform rotate-45 absolute"></div>
            <div className="w-4 h-0.5 bg-black transform -rotate-45 absolute"></div>
          </div>
        );
      case "CP":
        return (
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
              <span className="text-xs">P</span>
            </div>
          </div>
        );
      case "CSWAP":
        return (
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-4 border border-black rounded flex items-center justify-center relative">
              <div className="w-3 h-0.5 bg-black transform rotate-45 absolute"></div>
              <div className="w-3 h-0.5 bg-black transform -rotate-45 absolute"></div>
            </div>
          </div>
        );
      case "CH":
        return (
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-4 border border-black rounded flex items-center justify-center">
              <span className="text-xs">H</span>
            </div>
          </div>
        );
      case "⋮":
        return <EllipsisVerticalIcon className="w-6 h-6 text-gray-500" />;
      default:
        return (
          <span className="italic font-serif text-sm leading-none">
            {gate}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Conditionally render tour to fix hydration error */}
      {isClient && <OnboardingTour />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
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
              <h1 className="text-xl font-medium text-gray-600">
                Quantum Circuit Simulator
              </h1>
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
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm col-span-2 gates-panel">
            {/* Gates Header */}
            <div className="flex items-center justify-center p-4 border-b border-gray-200 bg-white">
              <h2 className="font-semibold text-gray-800">Quantum Gates</h2>
            </div>

            {/* Gates Grid */}
            <div className="p-4">
              <div className="flex flex-col space-y-3">
                {gates.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex space-x-2">
                    {row.gates.map((gate, gateIndex) => (
                      <button
                        key={`${rowIndex}-${gateIndex}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, gate)}
                        className={`w-14 h-14 bg-white border-2 ${row.borderColor} rounded-lg flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing transform hover:scale-105`}
                      >
                        {renderGateSymbol(gate)}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Panel: Quantum Circuit */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm col-span-7 circuit-area">
            {/* Circuit Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Quantum Circuit</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={simulateCircuit}
                  disabled={isSimulating}
                  className="flex items-center space-x-2 px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm simulate-button"
                >
                  <PlayIcon className="w-4 h-4" />
                  <span>{isSimulating ? "Simulating..." : "Simulate"}</span>
                </button>
                <button
                  onClick={resetCircuit}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                  title="Reset circuit"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Circuit Canvas */}
            <div
              className="p-6 min-h-[400px] bg-gradient-to-br from-gray-50 to-white"
              onDragOver={handleDragOver}
            >
              {/* Qubit Lines */}
              <div className="space-y-8">
                {Array.from({ length: qubitCount }, (_, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-16 text-right pr-4">
                      |q{index}⟩
                    </span>
                    <div
                      className="flex-1 h-10 bg-white relative border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 transition-colors"
                      onDrop={(e) => {
                        e.preventDefault();
                        const gate = e.dataTransfer.getData("text/plain");
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const position = Math.floor(x / 60);

                        setCircuitGates((prev) => {
                          const newGates = [...prev];
                          if (!newGates[index]) {
                            newGates[index] = [];
                          }

                          const existingGate = newGates[index].find(
                            (g) => g.position === position
                          );
                          if (!existingGate) {
                            newGates[index].push({ gate, position });
                          }
                          return newGates;
                        });
                      }}
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => {
                        e.currentTarget.classList.add(
                          "bg-blue-50",
                          "border-blue-400"
                        );
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove(
                          "bg-blue-50",
                          "border-blue-400"
                        );
                      }}
                    >
                      {/* Quantum wire line */}
                      <div className="absolute top-1/2 left-2 right-8 h-0.5 bg-gray-800 transform -translate-y-1/2"></div>

                      {/* Existing gates on this qubit */}
                      {circuitGates[index]?.map((gateInfo, gateIndex) => (
                        <div
                          key={gateIndex}
                          className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-blue-50 hover:shadow-md transition-all z-10"
                          style={{ left: `${gateInfo.position * 60 + 10}px` }}
                          onClick={() => {
                            setCircuitGates((prev) => {
                              const newGates = [...prev];
                              newGates[index] = newGates[index].filter(
                                (_, i) => i !== gateIndex
                              );
                              return newGates;
                            });
                          }}
                          title="Click to remove"
                        >
                          {gateInfo.gate}
                        </div>
                      ))}

                      {/* Measurement icon at the end */}
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-sky-400 rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3 mt-8">
                <span className="text-sm text-gray-600 font-medium">
                  Qubits:
                </span>
                <button
                  className="w-8 h-8 bg-sky-400 text-white rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors shadow-sm"
                  onClick={() =>
                    setQubitCount((prev) => Math.min(prev + 1, 10))
                  }
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
                <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                  {qubitCount}
                </span>
                <button
                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                  onClick={() => setQubitCount((prev) => Math.max(prev - 1, 1))}
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: QASM Code */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm col-span-3 qasm-panel">
            {/* QASM Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h2 className="font-semibold text-gray-800">QASM Code</h2>
              <QuestionMarkCircleIcon className="w-4 h-4 text-gray-600" />
            </div>

            {/* QASM Code Display */}
            <div className="p-4">
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96">
                <div className="flex">
                  {/* Line numbers */}
                  <div className="text-gray-500 mr-4 select-none">
                    {generateQasmCode()
                      .split("\n")
                      .map((_, index) => (
                        <div
                          key={index}
                          className="text-xs leading-5 text-right"
                        >
                          {index + 1}
                        </div>
                      ))}
                  </div>
                  {/* Code content */}
                  <div className="flex-1 text-green-400">
                    {generateQasmCode()
                      .split("\n")
                      .map((line, index) => (
                        <div key={index} className="leading-5">
                          {line || " "}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Histogram */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Histogram Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Measurement Results</h2>
            <div className="text-sm text-gray-500">
              {Object.keys(simulationResults).length > 0
                ? "Probability Distribution (%)"
                : "Run simulation to see results"}
            </div>
          </div>

          {/* Histogram Chart */}
          <div className="p-6">
            {Object.keys(simulationResults).length > 0 ? (
              <div>
                <div className="flex items-center justify-end mb-2">
                  <label className="text-sm text-gray-700 mr-2">Use percentage scale</label>
                  <input
                    type="checkbox"
                    checked={usePercentage}
                    onChange={(e) => setUsePercentage(e.target.checked)}
                  />
                </div>
                <Histogram labels={chartData.labels} values={chartData.values} yLabel={chartData.yLabel} yMax={chartData.yMax} />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <PlayIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>
                    Design your quantum circuit and click "Simulate" to see
                    results
                  </p>
                </div>
              </div>
            )}
          </div>

            {/* AI Explanation */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">AI Insight</h3>
                <button
                  onClick={explainResultsWithAI}
                  disabled={isExplaining || Object.keys(simulationResults).length === 0}
                  className="px-3 py-1.5 text-sm bg-sky-400 text-white rounded-md hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExplaining ? 'Analyzing...' : 'Explain with AI'}
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[60px] whitespace-pre-wrap text-gray-800">
                {aiExplanation || 'Run a simulation, then click "Explain with AI" to get an interpretation.'}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
