import React from "react";
import "../../Styles/project.css";
import Taskblock from "../../Components/Task/Taskblock/Taskblock";

export default function Project() {
    return (
        <div className="project-page">
            <div className="project-meta">
                <h2 className="project-name">Project Name</h2>
            </div>

            <div className="project-content">
                <div className="project-tasks">
                    <Taskblock status="To do" />
                    <Taskblock status="In Progress" />
                    <Taskblock status="Review" />
                    <Taskblock status="Done" />
                </div>
            </div>
        </div>
    )
};