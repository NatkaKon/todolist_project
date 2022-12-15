import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    return (
        edit
            ? <input onChange={onChangeHandler}
                     onBlur={onClickHandler}
                     value={newTitle}
                     autoFocus

            />
            : <span onClick={onClickHandler}>{props.title}</span>
    )
}