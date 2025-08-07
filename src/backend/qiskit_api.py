from flask import Flask, request, jsonify
from qiskit_aer import Aer  # ✅ Import from qiskit_aer directly
from qiskit import transpile
import os
try:
    # Preferred separate package for QASM 3 import
    from qiskit_qasm3_import import loads  # type: ignore
except Exception:
    # Fallback for environments where qiskit still exposes qasm3 module
    from qiskit.qasm3 import loads  # type: ignore
from flask_cors import CORS

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
        backend = Aer.get_backend("aer_simulator")  # ✅ Modern name
        transpiled = transpile(circuit, backend)
        result = backend.run(transpiled, shots=200).result()  # ✅ Match reference histogram shots
        counts = result.get_counts()
        return jsonify(counts)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
