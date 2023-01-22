import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import { TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import {AddBox} from '@mui/icons-material';

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
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
                    disabled={props.disabled}

                />
                <IconButton onClick={addTaskHandler} color='primary'disabled={props.disabled}>
                    <AddBox/>
                </IconButton>
            </div>
        </div>
    );
});

