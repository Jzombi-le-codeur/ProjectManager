import { Dropdown, Space } from 'antd';
import {useState} from "react";


export default function ProjectOptions({ project, setEditingProject, setEditingProjectAttribute, setCurrentProjectAttributeValue, removeProject }) {
    const [menuOpened, setMenuOpened] = useState(false);
    const items = [
        {
            key: "1",
            label: (
                <p>Renommer</p>
            ),
            style: {color: "#3388ff", padding: "0 0.5rem"},
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                domEvent.stopPropagation();
                setEditingProject(project.id);
                setEditingProjectAttribute("name")
                setCurrentProjectAttributeValue(project.name);
            }
        },
        {
            key: "2",
            label: (
                <p>Changer la Description</p>
            ),
            style: {color: "#3388ff", padding: "0 0.5rem"},
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                domEvent.stopPropagation();
                setEditingProject(project.id);
                setEditingProjectAttribute("description")
                setCurrentProjectAttributeValue(project.description);
            }
        },
        {
            key: "3",
            label: (
                <p>Changer le Statut</p>
            ),
            style: {color: "#3388ff", padding: "0 0.5rem"},
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                domEvent.stopPropagation();
                setEditingProject(project.id);
                setEditingProjectAttribute("status")
                setCurrentProjectAttributeValue(project.status);
            }
        },
        {
            key: "4",
            label: (
                <p>Supprimer</p>
            ),
            style: {color: "#ff0033", padding: "0 0.5rem"},
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                domEvent.stopPropagation();
                removeProject(project.id);
            }

        }
    ]

    return (
        <div className="task-actions">
            <div className="task-options" onClick={(e) => e.stopPropagation()}>
                <Dropdown
                    className="task-options-button"
                    menu={{ items }}
                    trigger={['click']}
                    open={menuOpened}
                    onOpenChange={(flag) => setMenuOpened(flag)}
                    placement="bottomRight"
                >
                    <span style={{ cursor: 'pointer', padding: '5px' }}>⋮</span>
                </Dropdown>
            </div>
        </div>
    )
}