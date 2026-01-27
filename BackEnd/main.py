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

@app.route("/api/get_projects", methods=["GET"])
def get_projects():
    data = projects.get_projects()
    return jsonify({"type": "data", "content": data})

@app.route("/api/add_project", methods=["POST"])
def add_project():
    # Vérifier si on veut modifier une info du projet
    data = request.get_json()
    if data["type"] == "message":
        projects.add_project()
        return jsonify({"type": "message", "content": "OK"})

    else:
        return jsonify({"type": "error", "content": data["content"]})

@app.route("/api/remove_project", methods=["POST"])
def remove_project():
    data = request.get_json()
    project_id = data["content"]["project_id"]
    projects.remove_project(project_id=project_id)
    return jsonify({"type": "response", "content": "OK"})

@app.route("/api/get_project/<project_id>")
def get_project(project_id):
    data = projects.get_project(project_id)
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
    project_id = data["project_id"]
    project_content = data["content"]

    # Sauvegarder le projet
    projects.save_project(project_id=project_id, content=project_content)

    return jsonify({"type": "response", "content": "OK"})

@app.route("/api/add_task", methods=["POST"])
def add_task():
    if request.method == "POST":
        data = request.get_json()
        column = data["content"]["column"]
        project_id = data["content"]["project_id"]

        task = projects.add_task(column=column, project_id=project_id)

        return jsonify({"type": "message", "content": "OK"})

    return jsonify({"type": "error", "content": "Couldn't create task"})


@app.route("/api/change_task", methods=["PUT"])
def change_task():
    data = request.get_json()
    id = data["content"]["id"]
    description = data["content"]["description"]
    project_id = data["content"]["project_id"]
    projects.change_task(id=id, description=description, project_id=project_id)
    return jsonify({"type": "response", "content": "OK"})

@app.route("/api/remove_task", methods=["POST"])
def remove_task():
    data = request.get_json()
    id = data["content"]["id"]
    project_id = data["content"]["project_id"]
    projects.remove_task(id=id, project_id=project_id)
    return jsonify({"type": "response", "content": "OK"})


if __name__ == "__main__":
    app.run(debug=True)