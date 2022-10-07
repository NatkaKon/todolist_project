import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtonType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterButtonType) => void
    addTask: (newTitle: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const greatChangeFilter = (filterValue: FilterButtonType) => {
        props.changeFilter(filterValue)
    }
//выносим в отдельную переменную map
    const mapTasks = props.tasks.map(el => {
        const removeTaskHandler = () => {
            props.removeTask(el.id)
        }

        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    return (<div>

            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {mapTasks}
            </ul>
            <div>
                <button onClick={() => greatChangeFilter('All')}>All</button>
                <button onClick={() => greatChangeFilter('Active')}>Active</button>
                <button onClick={() => greatChangeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}