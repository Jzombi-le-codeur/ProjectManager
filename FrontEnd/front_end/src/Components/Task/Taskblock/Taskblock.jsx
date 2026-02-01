import Task from "../Task/Task";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import TaskAdder from "../TaskAdder/TaskAdder";

export default function Taskblock({ status, tasks, taskblock_id, project_id, refreshProject }) {
    const { setNodeRef } = useDroppable({
        id: taskblock_id,
    })
    return (
        <div className="taskblock">
            <div className="taskblock-title">
                <h2>{status}</h2>
            </div>
            <div className="taskblock-tasks" ref={setNodeRef}>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    <TaskAdder column={taskblock_id} project_id={project_id} refreshProject={refreshProject} />
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            tags={task.tags}
                            description={task.description}
                            refreshProject={refreshProject}
                            project_id={project_id}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
