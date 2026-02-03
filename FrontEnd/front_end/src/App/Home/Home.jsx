import "../../Styles/home.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProjectOptions from "../../Components/Project/ProjectOptions/ProjectOptions";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [editingProject, setEditingProject] = useState("0");
    const [editingProjectAttribute, setEditingProjectAttribute] = useState("");
    const [currentProjectAttributeValue, setCurrentProjectAttributeValue] = useState("");

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

    const checkFilters = (project) => (
        (project.name.toUpperCase().includes(search.toUpperCase()) ||
        project.description.toUpperCase().includes(search.toUpperCase())) &&
        (project.status === statusFilter || statusFilter === "")
    )

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

    const changeProjectAttribute = () => {
        setEditingProjectAttribute("");
        fetch("http://127.0.0.1:5000/api/change_project", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({type: "message", content: {id: editingProject, attribute: editingProjectAttribute, value: currentProjectAttributeValue}})
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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            changeProjectAttribute();
        }
    }

    return (
        <main>
            <div className={"home-page"}>
                <div className="home-page-meta">
                    <h1 className="home-title">Bienvenue sur ProjectManager</h1>
                    <p className="home-description">Un simple outil de gestion de projet</p>
                </div>
                <div className="home-page-content">
                    <h2 className="projects-title">Vos Projets</h2>
                    <div className="projects-table-container">
                        <div className="projects-table-filters">
                            <input
                                className="project-searcher"
                                placeholder="🔍 Rechercher un projet..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select
                                className="project-status-filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">👌 Tous les Projets</option>
                                <option value="To Do">❌ To Do</option>
                                <option value="In Progress">🔁 In Progress</option>
                                <option value="Review">🔍 Review</option>
                                <option value="Done">✅ Done</option>
                            </select>
                        </div>
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
                                            checkFilters(project) ? (
                                                <tr key={`project-${project.id}`} className="projects-table-content">
                                                    <td>
                                                        {
                                                            editingProjectAttribute === "name" && editingProject === project.id ? (
                                                                <input
                                                                    type={"text"}
                                                                    value={currentProjectAttributeValue}
                                                                    onChange={(e) => setCurrentProjectAttributeValue(e.target.value)}
                                                                    onKeyDown={handleKeyDown}
                                                                    onBlur={() => changeProjectAttribute()}
                                                                    autoFocus={true}
                                                                    onFocus={(event) => event.target.select()}
                                                                />
                                                            ) : (
                                                                <p onDoubleClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setEditingProject(project.id);
                                                                    setEditingProjectAttribute("name")
                                                                    setCurrentProjectAttributeValue(project.name);
                                                                }}>
                                                                    {project.name}
                                                                </p>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            editingProjectAttribute === "description" && editingProject === project.id ? (
                                                                <input
                                                                    type={"text"}
                                                                    value={currentProjectAttributeValue}
                                                                    onChange={(e) => setCurrentProjectAttributeValue(e.target.value)}
                                                                    onKeyDown={handleKeyDown}
                                                                    onBlur={() => changeProjectAttribute()}
                                                                    autoFocus={true}
                                                                    onFocus={(event) => event.target.select()}
                                                                />
                                                            ) : (
                                                                <p onDoubleClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setEditingProject(project.id);
                                                                    setEditingProjectAttribute("description")
                                                                    setCurrentProjectAttributeValue(project.description);
                                                                }}>
                                                                    {project.description}
                                                                </p>
                                                            )
                                                        }
                                                    </td>
                                                    <td>{
                                                        editingProjectAttribute === "status" && editingProject === project.id ? (
                                                            <select
                                                                value={currentProjectAttributeValue}
                                                                onChange={(event) => {
                                                                    setCurrentProjectAttributeValue(event.target.value);
                                                                }}
                                                                onBlur={() => changeProjectAttribute()}
                                                            >
                                                                <option value="To Do">To Do</option>
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="Review">Review</option>
                                                                <option value="Done">Done</option>
                                                            </select>
                                                        ) : (
                                                            <p onDoubleClick={(event) => {
                                                                event.stopPropagation();
                                                                setEditingProject(project.id);
                                                                setEditingProjectAttribute("status")
                                                                setCurrentProjectAttributeValue(project.status);
                                                            }}>
                                                                {project.status}
                                                            </p>
                                                        )
                                                    }</td>
                                                    <td>
                                                        <div className="project-interactions">
                                                            <button className="project-access-button" onClick={() => handleProjectRedirection(project.id)}>Accéder au projet</button>
                                                            <ProjectOptions
                                                                project={project}
                                                                setEditingProject={setEditingProject}
                                                                setEditingProjectAttribute={setEditingProjectAttribute}
                                                                setCurrentProjectAttributeValue={setCurrentProjectAttributeValue}
                                                                removeProject={removeProject} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : ""
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
            </div>
        </main>
    )
}