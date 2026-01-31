import "../../Styles/home.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProjectOptions from "../../Components/Project/ProjectOptions/ProjectOptions";
import Project from "../Project/Project";


export default function Home() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    console.log(projects);

    const [editingProject, setEditingProject] = useState("0");
    const [editingProjectName, setEditingProjectName] = useState(false);
    const [currentProjectName, setCurrentProjectName] = useState("");
    const [editingProjectDescription, setEditingProjectDescription] = useState(false);
    const [currentProjectDescription, setCurrentProjectDescription] = useState("");
    const [editingProjectStatus, setEditingProjectStatus] = useState(false);

    const refreshHome = () => {
        fetch(`http://127.0.0.1:5000/api/get_projects`)
            .then(res => res.json())
            .then(data => {
                setProjects(data.content)
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        refreshHome();
    }, [])

    const handleProjectRedirection = (id) => {
        navigate(`/project/${id}`);
    }

    const addProject = () => {
        fetch(`http://127.0.0.1:5000/api/add_project`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"type": "message", "content": ""}),
        })
        .then(res => res.json())
        .then(data => {
            refreshHome();
        })
        .catch(error => console.log(error));
    }

    const removeProject = (project_id) => {
        fetch("http://127.0.0.1:5000/api/remove_project", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({type: "message", content: {project_id: project_id}})
        })
            .then(res => res.json())
            .then(data => {
                refreshHome();
            })
            .catch(err => console.log(err));
    }

    const changeProjectName = () => {
        setEditingProjectName(false);
        fetch("http://127.0.0.1:5000/api/change_project", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({type: "message", content: {id: editingProject, attribute: "name", value: currentProjectName}})
        })
            .then(res => {
                setEditingProject("0");
                res.json()
            })
            .then(data => {
                refreshHome();
            })
            .catch(err => console.log(err));
    }

    const changeProjectDescription = () => {
        setEditingProjectDescription(false);
        fetch("http://127.0.0.1:5000/api/change_project", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({type: "message", content: {id: editingProject, attribute: "description", value: currentProjectDescription}})
        })
            .then(res => {
                setEditingProject("0");
                res.json()
            })
            .then(data => {
                refreshHome();
            })
            .catch(err => console.log(err));
    }

    const handleProjectNameKeyDown = (event) => {
        if (event.key === "Enter") {
            changeProjectName();
        }
    }

    const handleProjectDescriptionKeyDown = (event) => {
        if (event.key === "Enter") {
            changeProjectDescription();
        }
    }

    return (
        <div className={"home-page"}>
            <div className="home-page-meta">
                <h1 className="home-title">Bienvenue sur ProjectManager</h1>
            </div>
            <div className="home-page-content">
                <h2 className="projects-title">Vos Projets</h2>
                <table className="projects-table">
                    <thead>
                        <tr className="projects-table-titles">
                            <th>Nom du Projet</th>
                            <th>Description du Projet</th>
                            <th>Statut du Projet</th>
                            <th>Lien d'accès</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map(project => {
                                return (
                                    <tr key={`project-${project.id}`} className="projects-table-content">
                                        <td>
                                            {
                                                editingProjectName && editingProject === project.id ? (
                                                    <input
                                                        type={"text"}
                                                        value={currentProjectName}
                                                        onChange={(e) => setCurrentProjectName(e.target.value)}
                                                        onKeyDown={handleProjectNameKeyDown}
                                                        onBlur={() => changeProjectName()}
                                                        autoFocus={true}
                                                        onFocus={(event) => event.target.select()}
                                                    />
                                                ) : (
                                                    <p onDoubleClick={(event) => {
                                                        event.stopPropagation();
                                                        setEditingProject(project.id);
                                                        setEditingProjectName(true)
                                                        setCurrentProjectName(project.name);
                                                    }}>
                                                        {project.name}
                                                    </p>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                editingProjectDescription && editingProject === project.id ? (
                                                    <input
                                                        type={"text"}
                                                        value={currentProjectDescription}
                                                        onChange={(e) => setCurrentProjectDescription(e.target.value)}
                                                        onKeyDown={handleProjectDescriptionKeyDown}
                                                        onBlur={() => changeProjectDescription()}
                                                        autoFocus={true}
                                                        onFocus={(event) => event.target.select()}
                                                    />
                                                ) : (
                                                    <p onDoubleClick={(event) => {
                                                        event.stopPropagation();
                                                        console.log(`Project : ${project}`)
                                                        setEditingProject(project.id);
                                                        setEditingProjectDescription(true)
                                                        setCurrentProjectDescription(project.description);
                                                    }}>
                                                        {project.description}
                                                    </p>
                                                )
                                            }
                                        </td>
                                        <td>{project.status}</td>
                                        <td>
                                            <div className="project-interactions">
                                                <button onClick={() => handleProjectRedirection(project.id)}>Accéder au projet</button>
                                                <ProjectOptions removeProject={removeProject} project_id={project.id} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" id="project-adder" onClick={() => addProject()}><span>+</span></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}