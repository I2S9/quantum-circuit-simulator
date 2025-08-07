from flask import Flask, request, jsonify
try:
    from qiskit_aer import Aer  # May be unavailable on some PaaS
    _AER_AVAILABLE = True
except Exception:
    Aer = None  # type: ignore
    _AER_AVAILABLE = False
from qiskit import transpile
import os
try:
    # Preferred separate package for QASM 3 import
    from qiskit_qasm3_import import loads  # type: ignore
except Exception:
    # Fallback for environments where qiskit still exposes qasm3 module
    from qiskit.qasm3 import loads  # type: ignore
from flask_cors import CORS
from qiskit.quantum_info import Statevector
from qiskit import QuantumCircuit

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])  # Health root for PaaS
def root():
    return "OK", 200

@app.route("/health", methods=["GET"])  # Explicit health endpoint
def health():
    return jsonify({"status": "healthy"}), 200

@app.route("/simulate", methods=["POST"])
def simulate():
    qasm_code = request.json.get("qasm", "")
    try:
        circuit = loads(qasm_code)
        shots = 200

        if _AER_AVAILABLE:
            backend = Aer.get_backend("aer_simulator")
            transpiled = transpile(circuit, backend)
            result = backend.run(transpiled, shots=shots).result()
            counts = result.get_counts()
        else:
            # Fallback: simulate via Statevector (no Aer dependency)
            # Build a circuit without measurements for state evolution
            qc_no_meas = QuantumCircuit(*circuit.qregs)
            for instr, qargs, cargs in circuit.data:
                if instr.name == "measure":
                    continue
                qc_no_meas.append(instr, qargs, cargs)

            sv = Statevector.from_instruction(qc_no_meas)
            probs_dict = sv.probabilities_dict()

            # Convert probabilities to counts (deterministic rounding)
            counts = {}
            remaining = shots
            items = list(sorted(probs_dict.items(), key=lambda x: x[0]))
            for i, (state, p) in enumerate(items):
                if i < len(items) - 1:
                    c = int(round(p * shots))
                    counts[state] = c
                    remaining -= c
                else:
                    counts[state] = max(0, remaining)

        return jsonify(counts)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
