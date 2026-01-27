import {useState} from "react";
import {Dropdown} from "antd";

export default function ProjectOptions({ removeProject, project_id }) {
    const [menuOpened, setMenuOpened] = useState(false);
    const items = [
        {
            key: "1",
            label: (
                <p>Editer</p>
            ),
            style: {color: "#3388ff", padding: "0 0.5rem"},
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                domEvent.stopPropagation();
            }
        },
        {
            key: "2",
            label: (
                <p>Supprimer</p>
            ),
            style: {color: "#ff0033", padding: "0 0.5rem"},
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                domEvent.stopPropagation();
                removeProject(project_id);
            }
        }
    ]

    return (
        <div className="project-actions">
            <div className="project-options" onClick={(e) => e.stopPropagation()}>
                <Dropdown
                    className="project-options-button"
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