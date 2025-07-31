'use client';
import Joyride, { Step } from 'react-joyride';

const steps: Step[] = [
  { target: '.gates-panel', content: 'These are the quantum gates. Drag them onto the qubit lines.' },
  { target: '.circuit-area', content: 'Drop gates here to construct your quantum circuit.' },
  { target: '.simulate-button', content: 'Click here to simulate the quantum circuit using Qiskit!' },
  { target: '.qasm-panel', content: 'This shows the generated QASM code for your circuit.' },
  { target: '.histogram-chart', content: 'This histogram shows the simulation output from Qiskit.' }
];

export default function OnboardingTour() {
  return (
    <Joyride
      steps={steps}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: '#0ea5e9', // sky-500
        },
      }}
    />
  );
}
