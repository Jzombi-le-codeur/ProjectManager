from flask import Flask, jsonify, request
from flask_cors import CORS
from projects import Projects


app = Flask(__name__)
projects = Projects()


from flask_cors import CORS

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

@app.route("/api/update_project", methods=["PUT"])
def update_project():
    # Vérifier si on veut modifier une info du projet
    if request.method == "PUT":
        data = request.get_json()
        project_name = data["project_name"]
        project_content = data["content"]

        # Sauvegarder le projet
        projects.save_project(project_name=project_name, content=project_content)

    # Si on veut créer une tâche
    elif request.method == "POST":
        pass

    return jsonify({"type": "response", "content": "OK"})


if __name__ == "__main__":
    app.run()