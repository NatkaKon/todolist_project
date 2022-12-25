import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
    title: 'API'
}
const settings={
    withCredentials:true,
    headers: {
        'API-KEY':'8d054d58-f071-4339-8c40-d8b1679095b2'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
           .then((res)=> {
               setState(res.data)
           })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title:'New TODO'}, settings)
            .then((res)=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='4d653605-877c-4c6a-86e3-70a15bf3f39a'
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res)=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='42dfa408-406e-4d12-8760-53c88c7e5834'
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT NEW'}, settings)
            .then((res)=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

