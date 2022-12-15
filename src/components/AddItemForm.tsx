import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from '../Todolist.module.css';
import {Button, TextField} from '@mui/material';

type PropsType = {
    callBack: (title: string) => void
}


export const AddItemForm = (props: PropsType) => {

    const {callBack} = props //деструктуризация пропсов

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <div>
                <TextField
                    variant='outlined'
                    value={title}
                    // className={error ? styles.error : ''}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    size={'small'}
                    error={!!error}
                    label={error ?'Title is required':'type your text...'}

                />
                <Button onClick={addTaskHandler} variant='contained' color='primary' size='small'>+</Button>
            </div>
        </div>
    );
};

