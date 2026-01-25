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

    def get_project(self, project_name: str) -> dict | str:
        project_file_path = pathlib.PurePath(self.projects_dir_path, f"{project_name}.json")
        if os.path.exists(project_file_path):
            with open(project_file_path, "r", encoding="utf-8") as project_file:
                return json.load(project_file)

        else:
            return "File not found"

    def save_project(self, project_name: str, content: dict) -> str:
        project_file_path = pathlib.PurePath(self.projects_dir_path, f"{project_name}.json")
        if os.path.exists(project_file_path):
            with open(project_file_path, "w", encoding="utf-8") as project_file:
                # Sauvegarder le contenu du projet
                json.dump(content, project_file, indent=4)

            return "OK"

        else:
            return "File not found"

    def add_task(self, column: str, project_name: str) -> dict:
        self.project = self.get_project(project_name=project_name)
        tasks = [task for column in self.project["tasks"].values() for task in column]
        tasks = pd.DataFrame(tasks)
        try:
            max_id = pd.to_numeric(tasks['id']).max()
            task = {"id": str(max_id+1), "tags": [], "description": "Tâche"}
            self.project["tasks"][column].insert(0, task)

        except KeyError:
            task = {"id": str(1), "tags": [], "description": "Tâche"}
            self.project["tasks"][column].append(task)

        self.save_project(project_name=project_name, content=self.project)
        return task

    def change_task(self, id: str, description: str, project_name: str):
        self.project = self.get_project(project_name=project_name)
        tasks = [task for column in self.project["tasks"].values() for task in column]
        for task in tasks:
            if task["id"] == id:
                task["description"] = description
                break

        self.save_project(project_name=project_name, content=self.project)

    def remove_task(self, id: str, project_name: str):
        self.project = self.get_project(project_name=project_name)
        tasks = [task for column in self.project["tasks"].values() for task in column]
        for task in tasks:
            if task["id"] == id:
                for column in self.project["tasks"].keys():
                    for task_og in self.project["tasks"][column]:
                        if task_og["id"] == id:
                            del self.project["tasks"][column][self.project["tasks"][column].index(task_og)]
                            self.save_project(project_name=project_name, content=self.project)
