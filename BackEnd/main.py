from flask import Flask, jsonify, request
from flask_cors import CORS
from projects import Projects


app = Flask(__name__)
projects = Projects()


CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:5000"]}},
    supports_credentials=True
)
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

@app.route("/api/change_tasks_order", methods=["PUT"])
def change_tasks_order():
    # Vérifier si on veut modifier une info du projet
    data = request.get_json()
    project_name = data["project_name"]
    project_content = data["content"]

    # Sauvegarder le projet
    projects.save_project(project_name=project_name, content=project_content)

    return jsonify({"type": "response", "content": "OK"})

@app.route("/api/add_task", methods=["POST"])
def add_task():
    if request.method == "POST":
        data = request.get_json()
        column = data["content"]["column"]
        project_name = data["content"]["project_name"]

        task = projects.add_task(column=column, project_name=project_name)

        return jsonify({"type": "message", "content": "OK"})

    return jsonify({"type": "error", "content": "Couldn't create task"})


@app.route("/api/change_task", methods=["PUT"])
def change_task():
    data = request.get_json()
    id = data["content"]["id"]
    description = data["content"]["description"]
    project_name = data["content"]["project_name"]
    projects.change_task(id=id, description=description, project_name=project_name)
    return jsonify({"type": "response", "content": "OK"})


if __name__ == "__main__":
    app.run(debug=True)