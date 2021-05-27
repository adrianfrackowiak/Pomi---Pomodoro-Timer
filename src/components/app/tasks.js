import React, { useState } from 'react';
import { FaCheck, FaTimes, FaMinus } from 'react-icons/fa';

const taskList = [{ name: 'Use pomi todo list!', done: false }];

const Tasks = () => {
    const [tasks, setTasks] = useState(taskList);
    const [newTask, setNewTask] = useState('');

    const handleNewTask = e => {
        setNewTask(e.target.value);
    };

    const pushToTasks = e => {
        e.preventDefault();
        if (newTask !== '')
            setTasks([...tasks, { name: newTask, done: false }]);

        setNewTask('');
    };

    const removeTask = id => {
        const list = [...tasks];
        list.splice(id, 1);
        setTasks(list);
    };

    const completeTask = id => {
        const list = [...tasks];
        list[id].done ? (list[id].done = false) : (list[id].done = true);
        setTasks(list);
    };

    return (
        <div className="tasks fx-col-cnt">
            <div className="tasks-field fx-col-cnt">
                <div className="new-task fx-cnt-col">
                    <input
                        value={newTask}
                        placeholder="Add new task"
                        onChange={handleNewTask}
                    />
                    <button onClick={pushToTasks}>ADD</button>
                </div>
                {tasks.map((todo, id) => (
                    <div className="tasks-list fx-cnt-col">
                        <div
                            className={
                                todo.done
                                    ? 'task done fx-spb-cnt'
                                    : 'task fx-spb-cnt'
                            }
                            key={id}
                        >
                            <p>{todo.name}</p>
                            <div className="task-buttons fx-cnt">
                                <p
                                    className="fx-cnt-cnt"
                                    onClick={() => completeTask(id)}
                                >
                                    {todo.done ? <FaMinus /> : <FaCheck />}
                                </p>
                                <p
                                    className="fx-cnt-cnt"
                                    onClick={() => removeTask(id)}
                                >
                                    <FaTimes />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
