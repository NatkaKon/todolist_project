import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import styles from '../Todolist.module.css';
import {Button, TextField} from '@mui/material';

type PropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = memo((props: PropsType) => {
    console.log('AddItemForm called compon')

    const {addItem} = props //деструктуризация пропсов

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            addItem(newTitle)
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
});

