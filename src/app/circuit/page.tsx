"use client";

import { useState, useEffect } from "react";
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

export default function CircuitPage() {
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
  const [isSimulating, setIsSimulating] = useState(false);
  const [isClient, setIsClient] = useState(false); // For hydration fix

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
          // Handle special gate names
          if (gateName === "t†") gateName = "tdg";
          if (gateName === "√x") gateName = "sx";
          if (gateName === "√z") gateName = "sz";
          if (gateName === "s") gateName = "s";
          if (gateName === "i") gateName = "id";
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
      const res = await fetch("http://localhost:5000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qasm: code }),
      });

      const data = (await res.json()) as { [key: string]: number };

      if (res.ok) {
        const normalized: { [key: string]: number } = {};
        const values = Object.values(data);

        // Type guard to ensure values are numbers
        if (values.every((val) => typeof val === "number")) {
          const total = values.reduce((sum, val) => sum + val, 0);

          for (const [key, val] of Object.entries(data)) {
            normalized[key] = Math.round((val / total) * 100);
          }
          setSimulationResults(normalized);
        } else {
          throw new Error("Invalid response format");
        }
      } else {
        alert("Simulation failed: " + data.error);
      }
    } catch (err) {
      alert("Server error: " + err);
    } finally {
      setIsSimulating(false);
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
        return <span>{gate}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Conditionally render tour to fix hydration error */}
      {isClient && <OnboardingTour />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between relative">
            {/* Logo and Qubitly - Left */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Qubitly</span>
            </div>

            {/* Page Title - Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-semibold text-gray-700">
                Quantum Circuit Simulator
              </h1>
            </div>

            {/* Info button - Right */}
            <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
              <InformationCircleIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Circuit Interface */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Left Panel: Gates */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm col-span-3 gates-panel">
            {/* Gates Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-sky-50 to-blue-50">
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              <h2 className="font-semibold text-gray-800">Quantum Gates</h2>
              <div className="flex items-center space-x-2">
                <Squares2X2Icon className="w-4 h-4 text-gray-600" />
                <InformationCircleIcon className="w-4 h-4 text-gray-600" />
              </div>
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
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm col-span-6 circuit-area">
            {/* Circuit Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Quantum Circuit</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={simulateCircuit}
                  disabled={isSimulating}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm simulate-button"
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
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
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
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
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
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
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
              <div className="h-64 flex items-end justify-center space-x-4 histogram-chart">
                {Object.entries(simulationResults)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([state, probability], index) => (
                    <div
                      key={state}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className="text-xs font-medium text-gray-600">
                        {probability}%
                      </div>
                      <div
                        className="bg-gradient-to-t from-sky-500 to-blue-400 rounded-t-lg shadow-sm min-h-[4px] w-16 transition-all duration-500"
                        style={{
                          height: `${Math.max((probability / 100) * 200, 4)}px`,
                        }}
                      />
                      <div className="text-xs font-mono text-gray-700 transform -rotate-45 origin-center">
                        |{state}⟩
                      </div>
                    </div>
                  ))}
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
        </div>
      </div>
    </div>
  );
}
