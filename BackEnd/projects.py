import pathlib, os
import json
import pandas as pd


class Projects:
    def __init__(self):
        self.projects_dir_path = pathlib.Path("Projects\\Projects")
        self.projects = list()
        self.project = dict()

    def get_projects(self) -> list:
        with open(pathlib.Path("Projects\\projects.json"), "r", encoding="utf-8") as projects_file:
            self.projects = json.load(projects_file)
            return self.projects

    def add_project(self):
        self.projects = self.get_projects()

        project_ids = [project["id"] for project in self.projects]
        try:
            max_id = pd.to_numeric(project_ids).max()
            project = {
                "id": str(max_id+1),
                "name": "Project's Name",
                "description": "Project's Description",
                "status": "To Do"
            }
            self.projects.insert(0, project)

        except (KeyError, ValueError):
            project = {
                "id": str(1),
                "name": "Project's Name",
                "description": "Project's Description",
                "status": "To Do"
            }
            self.projects.append(project)

        self.save_projects()

    def save_projects(self) -> None:
        with open(pathlib.Path("Projects\\projects.json"), "w", encoding="utf-8") as projects_file:
            json.dump(self.projects, projects_file, indent=4)

        with open(pathlib.PurePath(self.projects_dir_path, f"{self.projects[0]["id"]}.json"), "w", encoding="utf-8") as project_file:
            project_content = {
                "name": self.projects[0]["name"],
                "description": self.projects[0]["description"],
                "status": self.projects[0]["status"],
                "tasks": {
                    "to_do": [],
                    "in_progress": [],
                    "review": [],
                    "done": []
                }
            }

            json.dump(project_content, project_file, indent=4)

    def get_project(self, project_id: str) -> dict | str:
        project_exists = False
        for project in self.projects:
            if project["id"] == project_id:
                project_exists = True

        if project_exists:
            with open(pathlib.PurePath(self.projects_dir_path, f"{project_id}.json"), "r", encoding="utf-8") as project_file:
                return json.load(project_file)

        else:
            return "File not found"

    def save_project(self, project_id: str, content: dict) -> str:
        self.get_projects()
        project_file_path = pathlib.PurePath(self.projects_dir_path, f"{project_id}.json")
        if os.path.exists(project_file_path):
            with open(project_file_path, "w", encoding="utf-8") as project_file:
                # Sauvegarder le contenu du projet
                json.dump(content, project_file, indent=4)

            return "OK"

        else:
            return "File not found"

    def add_task(self, column: str, project_id: str) -> dict:
        self.project = self.get_project(project_id=project_id)
        tasks = [task for column in self.project["tasks"].values() for task in column]
        tasks = pd.DataFrame(tasks)
        try:
            max_id = pd.to_numeric(tasks['id']).max()
            task = {"id": str(max_id+1), "tags": [], "description": "Tâche"}
            self.project["tasks"][column].insert(0, task)

        except KeyError:
            task = {"id": str(1), "tags": [], "description": "Tâche"}
            self.project["tasks"][column].append(task)

        self.save_project(project_id=project_id, content=self.project)
        return task

    def change_task(self, id: str, description: str, project_id: str):
        self.project = self.get_project(project_id=project_id)
        tasks = [task for column in self.project["tasks"].values() for task in column]
        for task in tasks:
            if task["id"] == id:
                task["description"] = description
                break

        self.save_project(project_id=project_id, content=self.project)

    def remove_task(self, id: str, project_id: str):
        self.project = self.get_project(project_id=project_id)
        tasks = [task for column in self.project["tasks"].values() for task in column]
        for task in tasks:
            if task["id"] == id:
                for column in self.project["tasks"].keys():
                    for task_og in self.project["tasks"][column]:
                        if task_og["id"] == id:
                            del self.project["tasks"][column][self.project["tasks"][column].index(task_og)]
                            self.save_project(project_id=project_id, content=self.project)
