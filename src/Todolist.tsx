import React, {ChangeEvent, useState} from 'react';
import {FilterButtonType} from './App';
import styles from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TodolistPropsType = {
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
    editTask: (todoListID: string, id: string, newTitle: string) => void
    editTodoListTitle: (todoListID: string, newTitle: string) => void
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

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }
    const editTodoListTitleHandler = (newTitle: string) => {
        props.editTodoListTitle(props.todoListID, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodoListTitleHandler}/>
            <IconButton onClick={removeTodoListHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {props.tasks.map(el => {
                const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeInput(props.todoListID, el.id, e.currentTarget.checked)
                }
                const editTaskHandler = (newTitle: string) => {
                    props.editTask(props.todoListID, el.id, newTitle)
                }

                return (
                    <li className={el.isDone ? styles.isDone : ''}
                        key={el.id}>
                        <Checkbox checked={el.isDone} onChange={changeInputHandler}/>
                        <EditableSpan title={el.title} callBack={editTaskHandler}/>
                        <IconButton onClick={() => removeTaskHandler(el.id)}>
                            <Delete fontSize="small"/>
                        </IconButton>
                    </li>
                )
            })
            }
        </ul>
        <div>
            <Button size='small' variant={nameButton === 'all'? 'outlined':'contained'} color='success' onClick={onClickAllHandler} >All</Button>
            <Button size='small' variant={nameButton === 'active'? 'outlined':'contained'} color='error'onClick={onClickActiveHandler} >Active</Button>
            <Button size='small' variant={nameButton === 'completed' ?'outlined':'contained'} color='secondary'onClick={onClickCompletedHandler} >Completed</Button>
        </div>
    </div>
}


