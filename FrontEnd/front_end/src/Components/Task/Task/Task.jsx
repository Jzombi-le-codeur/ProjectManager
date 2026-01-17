import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import trashIcon from "../../../Assets/trash-icon.png";

export default function Task({ id, tags, description, refreshProject, project_name }) {
    const [editingDescription, setEditingDescription] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(description);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            changeDescription();
        }
    }

    const changeDescription = () => {
        setEditingDescription(false)
        fetch("http://127.0.0.1:5000/api/change_task", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: "message", content: {id: id, description: currentDescription, project_name: project_name}})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            refreshProject();
        })
        .catch(err => console.log(err));
    }

    return (
        <div ref={setNodeRef} style={style} className="task">
            <div className="task-drag-handle" {...listeners} {...attributes} style={{ cursor: "grab" }}>
                <p>⠿</p>
            </div>
            <div className="task-main">
                <div className="task-content">
                    <div className="task-tag">
                        {tags.map((tag, index) => {
                            if (index === 0) {
                                return <p className={"tag tag-start"} key={`tag-${id}-${index}`}>{tag}</p>
                            } else if (index === tags.length - 1) {
                                return <p className={"tag tag-end"} key={`tag-${id}-${index}`}>{tag}</p>
                            } else {
                                return <p className={"tag"} key={`tag-${id}-${index}`}>{tag}</p>
                            }
                        })}
                    </div>
                    <div className="task-description" onDoubleClick={(event) => {
                        event.stopPropagation();
                        setEditingDescription(true);
                    }}>
                        {
                            !editingDescription ? (
                                <p>{ currentDescription }</p>
                            ) : (
                                <input
                                    type={"text"}
                                    value={currentDescription}
                                    onChange={(e) => setCurrentDescription(e.target.value)}
                                    onBlur={() => changeDescription()}
                                    onKeyDown={handleKeyDown}
                                    autoFocus={true}
                                    onFocus={(event) => event.target.select()}
                                />
                            )
                        }
                    </div>
                </div>
                <div className="task-actions">
                    <div className="task-more">
                        <p>⋮</p>
                    </div>
                </div>
            </div>
        </div>
    )
};