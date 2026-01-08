import React from "react";
import "../../Styles/project.css";
import Taskblock from "../../Components/Task/Taskblock/Taskblock";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import {arrayMove} from "@dnd-kit/sortable";

export default function Project() {
    const [tasks, setTasks] = useState([
        { id: "task-1", tags: ["Tag 1", "Tag 2", "Tag 3"], description: "Faire la tâche 1" },
        { id: "task-2", tags: ["Tag 1", "Tag 2", "Tag 3"], description: "Faire la tâche 2" },
        { id: "task-3", tags: ["Tag 1", "Tag 2", "Tag 3"], description: "Faire la tâche 3" },
    ]);

    const getTaskPos = id => tasks.findIndex(task => task.id === id);

    const handleDragEnd = event => {
        const { active, over } = event;

        // Rien retourner si la position n'a pas changée
        if (active.id === over.id) {
            return
        };

        setTasks(tasks => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        })
    }
    return (
        <div className="project-page">
            <div className="project-meta">
                <h2 className="project-name">Project Name</h2>
            </div>

            <div className="project-content">
                <div className="project-tasks">
                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                        <Taskblock status="To do" tasks={tasks} />
                    </DndContext>
                </div>
            </div>
        </div>
    )
};