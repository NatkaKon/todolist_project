import React, {ChangeEvent, useState} from 'react';
import {FilterButtonType} from './App';
import styles from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm';

type TodolistPropsType = {
    todoListID: string
    id: string
    title: string
    filter: FilterButtonType
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskID: string) => void
    changeFilter: (todoListID: string, filterValue: FilterButtonType) => void
    addTask: (todoListID: string, newTitle: string) => void
    changeInput: (todoListID: string, id: string, newIsDone: boolean) => void
    removeTodoList: (todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    let [nameButton, setNameButton] = useState<FilterButtonType>('all')

    const onClickAllHandler = () => {
        props.changeFilter(props.todoListID, 'all')
        setNameButton('all')
    }
    const onClickActiveHandler = () => {
        props.changeFilter(props.todoListID, 'active')
        setNameButton('active')
    }
    const onClickCompletedHandler = () => {
        props.changeFilter(props.todoListID, 'completed')
        setNameButton('completed')

    }
    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.todoListID, taskID)
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)

    }

    const addTaskHandler=(newTitle: string)=> {
        props.addTask(props.todoListID,newTitle )

    }
    return <div>
        <h3>
            {props.title}
            <button onClick={removeTodoListHandler}>x</button>
        </h3>
       <AddItemForm callBack={addTaskHandler}/>
        {/*<div>*/}
        {/*    <input*/}
        {/*        className={error ? styles.error : ''}*/}
        {/*        value={title}*/}
        {/*        onChange={onChangeHandler}*/}
        {/*        onKeyDown={onKeyDownHandler}*/}
        {/*    />*/}
        {/*    <button onClick={addTaskHandler}>+</button>*/}
        {/*</div>*/}
        {/*{error && <div className={styles.errorMessage}>{error}</div>}*/}
        <ul>
            {props.tasks.map(el => {
                const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeInput(props.todoListID, el.id, e.currentTarget.checked)
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
            <button className={nameButton === 'all' ? styles.activeFilter : ''} onClick={onClickAllHandler}>All</button>
            <button className={nameButton === 'active' ? styles.activeFilter : ''}
                    onClick={onClickActiveHandler}>Active
            </button>
            <button className={nameButton === 'completed' ? styles.activeFilter : ''}
                    onClick={onClickCompletedHandler}>Completed
            </button>
        </div>
    </div>
}