# Qubitly

**Your comprehensive quantum computing learning platform**

> Qubitly is an interactive web application designed to help users learn and explore quantum computing concepts through AI-powered conversations, visual circuit building, and comprehensive educational resources.

## Features

- **QubitlyAi Chat** - AI-powered quantum computing assistant for real-time Q&A
- **Suggested Prompts** - Curated prompts for focused learning on specific topics
- **Quantum Circuit Builder** - Visual drag-and-drop interface for building quantum circuits
- **Learning Roadmap** - Structured learning path from beginner to advanced quantum computing
- **Educational Resources** - Latest articles, research papers, and learning materials
- **Modern UI/UX** - Clean, intuitive interface with responsive design

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **AI Integration**: OpenAI API
- **Quantum Simulation**: Qiskit (Python backend)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- OpenAI API key (for AI chat functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quantum-circuit-simulator.git
cd quantum-circuit-simulator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the project root:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Optional: Quantum Simulator Backend

If you want to run the Qiskit simulator backend separately:

1. Navigate to the backend directory:
```bash
cd src/backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python qiskit_api.py
```

4. Add the simulator URL to your `.env.local`:
```env
SIMULATOR_URL=http://localhost:5000
```

## Project Structure

```
quantum-circuit-simulator/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── chat/           # Chat functionality
│   │   ├── circuit/        # Quantum circuit builder
│   │   ├── info/           # Educational resources
│   │   └── api/            # API routes
│   ├── components/         # Reusable React components
│   └── backend/            # Python Qiskit backend
├── public/                 # Static assets
└── README.md
```

## Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
