import { Dropdown, Space } from 'antd';
import {useState} from "react";


export default function TaskOptions({ setEditingDescription, removeTask }) {
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
                setEditingDescription(true);
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
                removeTask();
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