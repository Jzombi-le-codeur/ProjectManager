import Task from "../Task/Task";

export default function Taskblock({ status }) {
    return (
        <div className="taskblock">
            <div className="taskblock-title">
                <h2>{status}</h2>
            </div>
            <div className="taskblock-tasks">
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    )
};