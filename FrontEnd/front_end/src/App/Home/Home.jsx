import "../../Styles/home.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Home() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/get_projects`)
            .then(res => res.json())
            .then(data => {
                console.log(data.content);
                setProjects(data.content)
            })
            .catch(error => console.log(error));
    }, [])

    const handleProjectRedirection = (id) => {
        navigate(`/project/${id}`);
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
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td>{project.status}</td>
                                        <td><button onClick={() => handleProjectRedirection(project.id)}>Accéder au projet</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}