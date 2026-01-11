import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../Styles/project.css";
import Taskblock from "../../Components/Task/Taskblock/Taskblock";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import {arrayMove} from "@dnd-kit/sortable";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reformat_status_name(status) {
    return capitalize(status).replace("_", " ");;
}

export default function Project() {
    const [tasks, setTasks] = useState({});

    const columns = Object.keys(tasks);

    // Récupérer le nom du projet
    const { project_name } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/get_project/${project_name}`)
            .then((response) => response.json())
            .then((data) => {setTasks(data.content)})
            .catch((error) => console.log(error));
    }, [])

    // Trouve la colonne où est la tâche
    const findColumn = (id) => {
        // Vérifier si on survole une colonne
        if (id in tasks) {
            return id;
        }

        // L'objet qu'on survole n'étant pas une colonne, il s'agit d'une tâche
        // Trouver la colonne contenant cette tâche
        for (let key of Object.keys(tasks)) {
            if (tasks[key].some((task) => task.id === id)) {
                return key;
            };
        }
    }

    const handleDragOver = (event) => {
        const { active, over } = event;

        // Vérifier si la souris n'est dans aucune colonne ou sur aucune tâche
        if (!over) return;

        // Vérifier si les colonnes existent ou si les colonnes d'arrivée et de destination sont les mêmes
        const activeColumn = findColumn(active.id);
        const overColumn = findColumn(over.id);
        if (!activeColumn || !overColumn || activeColumn == overColumn) return;

        // Déplacer la tâche
        setTasks((prev) => {
            // Récupérer les contenus des colonnes
            const activeItems = prev[activeColumn];
            const overItems = prev[overColumn];

            // Récupérer l'index de la tâche avant déplacement et après déplacement
            const activeIndex = activeItems.findIndex((i) => i.id === active.id)
            const overIndex = overItems.findIndex((i) => i.id === over.id)

            // Adapter l'index si la tâche est déplacée sur la colonne (son fond) et pas une tâche
            // Sert si la colonne est vide
            const newIndex = overIndex >= 0 ? overIndex : overItems.length;

            // Effectuer le déplacement
            return {
                ...prev,
                // On enlève la tâche de la colonne d'origine (A)
                [activeColumn]: activeItems.filter((i) => i.id !== active.id),

                // On l'injecte dans la colonne cible (B)
                [overColumn]: [
                    ...overItems.slice(0, newIndex),
                    activeItems[activeIndex],
                    ...overItems.slice(newIndex)
                ]
            };
        });
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // Si on lâche dans le vide, on s'arrête
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // 1. On localise les colonnes
        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);

        // 2. CAS : On est dans la MÊME colonne (Tri interne)
        if (activeColumn && overColumn && activeColumn === overColumn) {
            // On récupère les index actuels
            const activeIndex = tasks[activeColumn].findIndex((t) => t.id === activeId);
            const overIndex = tasks[activeColumn].findIndex((t) => t.id === overId);

            // Si la place a changé, on utilise arrayMove
            if (activeIndex !== overIndex) {
                setTasks((prev) => ({
                    ...prev,
                    [activeColumn]: arrayMove(prev[activeColumn], activeIndex, overIndex),
                }));
            }
        }
    };

    return (
        <div className="project-page">
            <div className="project-meta">
                <h2 className="project-name">{project_name}</h2>
            </div>

            <div className="project-content">
                <div className="project-tasks">
                    <DndContext collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                        {
                            columns.map(column => {
                                const status = reformat_status_name(column);
                                return <Taskblock
                                    key={`column-${column}`}
                                    taskblock_id={column}
                                    status={status}
                                    tasks={tasks[column]}
                                />
                            })
                        }
                    </DndContext>
                </div>
            </div>
        </div>
    )
};