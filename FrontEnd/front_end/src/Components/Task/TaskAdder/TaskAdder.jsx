import {arrayMove} from "@dnd-kit/sortable";

export default function TaskAdder({ column, project_name, refreshProject }) {
    const addtask = () => {
        fetch("http://127.0.0.1:5000/api/add_task", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"type": "message", "content": {"column": column, "project_name": project_name}}),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.content)
                if (data.type === "message" && data.content === "OK") {
                    refreshProject();
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="task-adder" onClick={() => addtask()}>
            +
        </div>
    )
};