import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ id, tags, description }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        cursor: "grab",
    }
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="task">
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
            <div className="task-description">
                <p>{ description }</p>
            </div>
        </div>
    )
};