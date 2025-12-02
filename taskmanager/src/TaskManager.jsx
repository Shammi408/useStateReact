import { useState } from "react";

function TaskManager() {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("low");
    const [tasks, setTasks] = useState([]);

    const [filterPriority, setFilterPriority] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const priorityRank = {
        high: 3,
        medium: 2,
        low: 1,
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim()) return;

        const newTask = {
        id: Date.now(),
        title,
        priority,
        completed: false,
        };

        setTasks([...tasks, newTask]);
        setTitle("");
        setPriority("low");
    }

    const toggleComplete = (id) => {
        setTasks((prev) =>
        prev.map((task) =>
            task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
        );
    };

    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Sorting
    const sortedTasks = [...tasks].sort(
        (a, b) => priorityRank[b.priority] - priorityRank[a.priority]
    );

    // Filtering
    const filteredTasks = sortedTasks.filter((task) => {
        if (filterPriority !== "all" && task.priority !== filterPriority)
        return false;

        if (filterStatus === "completed" && !task.completed) return false;
        if (filterStatus === "incomplete" && task.completed) return false;

        return true;
    });

  return (
        <div>
            <h1>Welcome to the Task Manager</h1>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={title}
                placeholder="Add new task"
                onChange={(e) => setTitle(e.target.value)}
                />

                <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>

                <button type="submit">Add Task</button>
            </form>

            <hr />

            <div>
                <label>Priority Filter: </label>
                <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                >
                <option value="all">All</option>
                <option value="low">Low Only</option>
                <option value="medium">Medium Only</option>
                <option value="high">High Only</option>
                </select>

                &nbsp;&nbsp;

                <label>Status Filter: </label>
                <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                >
                <option value="all">All</option>
                <option value="completed">Completed Only</option>
                <option value="incomplete">Incomplete Only</option>
                </select>
            </div>

            <ul>
                {filteredTasks.length === 0 && <p>No Tasks Found</p>}

                {filteredTasks.map((item) => (
                <li key={item.id}>
                    <span
                    onClick={() => toggleComplete(item.id)}
                    style={{
                        cursor: "pointer",
                        textDecoration: item.completed ? "line-through" : "none",
                        fontWeight: item.priority === "high" ? "bold" : "normal",
                        color: item.priority === "high" ? "red" : "inherit",
                    }}
                    >
                    {item.title} ({item.priority})
                    </span>
                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
