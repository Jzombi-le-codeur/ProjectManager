import pathlib, os
import json


class Projects:
    def __init__(self):
        self.projects_dir_path = pathlib.Path("Projects\\Projects")
        self.project = dict()

    def get_project(self, project_name) -> dict:
        if os.path.exists(pathlib.PurePath(self.projects_dir_path, f"{project_name}.json")):
            with open(pathlib.PurePath(self.projects_dir_path, f"{project_name}.json"), "r") as project_file:
                return json.load(project_file)

        else:
            return "File not found"

    def get_projects(self):
        with open()