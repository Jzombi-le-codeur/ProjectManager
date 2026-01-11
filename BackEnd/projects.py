import pathlib, os
import json


class Projects:
    def __init__(self):
        self.projects_dir_path = pathlib.Path("Projects\\Projects")
        self.project = dict()

    def get_project(self, project_name) -> dict:
        project_file_path = pathlib.PurePath(self.projects_dir_path, f"{project_name}.json")
        if os.path.exists(project_file_path):
            with open(project_file_path, "r", encoding="utf-8") as project_file:
                return json.load(project_file)

        else:
            return "File not found"
