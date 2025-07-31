from flask import Flask, request, jsonify
from qiskit_aer import Aer  # ✅ Import from qiskit_aer directly
from qiskit import transpile
from qiskit.qasm3 import loads
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/simulate", methods=["POST"])
def simulate():
    qasm_code = request.json.get("qasm", "")
    try:
        circuit = loads(qasm_code)
        backend = Aer.get_backend("aer_simulator")  # ✅ Modern name
        transpiled = transpile(circuit, backend)
        result = backend.run(transpiled, shots=1000).result()  # ✅ No assemble()
        counts = result.get_counts()
        return jsonify(counts)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)
