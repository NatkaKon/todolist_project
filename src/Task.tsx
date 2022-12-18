import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void

}
export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    },[props.changeTaskTitle,props.task.id])

    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan title={props.task.title} callBack={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})