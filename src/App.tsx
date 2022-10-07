import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterButtonType = 'All' | 'Completed' | 'Active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}
    ])
    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])

    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }
    let [filter, setFilter] = useState<FilterButtonType>('All')

    let filteredTasks = tasks

    if (filter === 'Active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }

    if (filter === 'Completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }


    const changeFilter = (filterValue: FilterButtonType) => {
        setFilter(filterValue)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}

            />

        </div>
    );
}

export default App;
