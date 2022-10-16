import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from '../Todolist.module.css';

type PropsType = {
    callBack: (title: string) => void
}


export const AddItemForm = (props: PropsType) => {

    const {callBack}=props //деструктцризация пропсов

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
                <input
                    className={error ? styles.error : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

