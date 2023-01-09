import React, {useEffect, useState} from 'react'
import { todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('New TODO')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '6a450b21-e6ed-41ca-9dd8-90fd8d224bdc'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '83ad50ea-06cd-4f70-b4b5-7c2186f36ba0'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'Christmas')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='83ad50ea-06cd-4f70-b4b5-7c2186f36ba0'
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='87e1af40-0a7e-47ec-84ae-9897173abbfe'
    const taskId='68f62f34-05b7-470e-9260-d168b9cbf77f'

    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId='83ad50ea-06cd-4f70-b4b5-7c2186f36ba0'

    useEffect(() => {
        todolistAPI.createTask(todolistId,'First task')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '83ad50ea-06cd-4f70-b4b5-7c2186f36ba0'
    const taskId='587484cc-4298-4ba9-8d05-7e348ce51827'
    useEffect(() => {
        todolistAPI.updateTask(todolistId, taskId, {title:'UPDATE', status:0, startDate:'', description:'', priority:0, deadline:''})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}