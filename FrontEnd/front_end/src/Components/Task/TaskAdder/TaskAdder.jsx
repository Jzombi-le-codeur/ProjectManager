import {arrayMove} from "@dnd-kit/sortable";

export default function TaskAdder({ column, tasks, setTasks }) {
    const addtask = () => {
        fetch("http://127.0.0.1:5000/api/update_project", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"type": "message", "content": {"column": column}}),
        })
            .then(res => res.json())
            .then(data => {console.log(data.content)})
            .catch(err => console.log(err));
    }
    return (
        <div className="task-adder" onClick={() => addtask()}>
            +
        </div>
    )
};