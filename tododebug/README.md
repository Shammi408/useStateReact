Q1. The "Add Task" button sometimes adds empty tasks.
Fix ::: To prevent adding empty task.
When we get the input we need to check if the input string is empty or not
const addTask = () => {
  if (!input.trim()) return; // if empty do nothing
  setTasks([...tasks, { text: input.trim(), completed: false }]);
  setInput('');
};

Q2. Completed tasks are not visually distinguishable (no strike-through)
Fix ::: We check if the task.completed field is true/false 
if true we add a strike through using inline styling
<span onClick={() => toggleComplete(i)}
  style={{
    textDecoration: task.completed ? "line-through" : "none", //check and add
    cursor: "pointer"
  }}
>
  {task.text}
</span>
Our toggleComplete function already handles click (to mark complete/incomplete)

Q3. The "Delete Task" button deletes the wrong task occasionally.
Fix ::: We need to remove the task whose index is index, but the condition uses i !== index - 1, so:
If we click delete on item 2 (index = 1), we actually keep everything except i !== 0, so item 1 gets deleted.
For the first item (index = 0), it will never be deleted because i !== -1 is always true.   We need to compare with index directly:

const deleteTask = (index) => {
  const newTasks = tasks.filter((task, i) => i !== index);
  setTasks(newTasks);
};


