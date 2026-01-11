from flask import Flask, jsonify
from flask_cors import CORS
from projects import Projects


app = Flask(__name__)
projects = Projects()


CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:5000"])
app.json.sort_keys = False


@app.route("/")
def index():
    return "<p>BackEnd de ProjectManager</p>"

@app.route("/api/get_project/<project_name>")
def get_project(project_name):
    data = projects.get_project(project_name)
    if isinstance(data, dict):
        return jsonify({"type": "data", "content": data})

    elif isinstance(data, str):
        return jsonify({"type": "error", "content": data})

    else:
        return "Uh"


if __name__ == "__main__":
    app.run()