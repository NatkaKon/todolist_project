import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtonType} from './App';
import styles from './Todolist.module.css'

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterButtonType) => void
    addTask: (newTitle: string) => void
    changeInput: (id: string, newIsDone: boolean) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [nameButton, setNameButton] = useState<FilterButtonType>('All')

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onClickAllHandler = () => {
        props.changeFilter('All')
        setNameButton('All')

    }
    const onClickActiveHandler = () => {
        props.changeFilter('Active')
        setNameButton('Active')

    }
    const onClickCompletedHandler = () => {
        props.changeFilter('Completed')
        setNameButton('Completed')

    }


    const removeTaskHandler = (taskID: string) => {
        props.removeTask(taskID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? styles.error : ''}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}

            />
            <button onClick={addTaskHandler}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <ul>
            {props.tasks.map(el => {
                const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeInput(el.id, e.currentTarget.checked)
                }
                return (
                    <li className={el.isDone ? styles.isDone : ''}
                        key={el.id}>
                        <input

                            type="checkbox" checked={el.isDone} onChange={changeInputHandler}/>
                        <span>{el.title}</span>
                        <button onClick={() => removeTaskHandler(el.id)}>x
                        </button>
                    </li>
                )
            })
            }
        </ul>
        <div>
            <button className={nameButton === 'All' ? styles.activeFilter : ''} onClick={onClickAllHandler}>All</button>
            <button className={nameButton === 'Active' ? styles.activeFilter : ''}
                    onClick={onClickActiveHandler}>Active
            </button>
            <button className={nameButton === 'Completed' ? styles.activeFilter : ''}
                    onClick={onClickCompletedHandler}>Completed
            </button>
        </div>
    </div>
}