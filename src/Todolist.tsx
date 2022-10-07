import React, {ChangeEvent, useState} from 'react';
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

    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    return (<div>

            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {
                                props.removeTask(el.id)
                            }}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('All')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}