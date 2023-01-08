import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '8d054d58-f071-4339-8c40-d8b1679095b2',
    },
})

//api
export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`,)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteTasksType>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{item:string}, AxiosResponse<ResponseType<{item:TaskType}>>>(`/todo-lists/${todolistId}/tasks`, {title},)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{item:TaskType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

//types

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
export type ResponseType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T;
}
export type GetTaskResponseType = {
    error: string | null;
    items: TaskType[];
    totalCount: number;
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title:string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type GetTasksResponse={
    error: string|null
    totalCount: number
    items:TaskType[]
}



//удалить то что ниже

export type DeleteTasksType = {
    resultCode: number
    messages: string[],
    data: {}
}
export type CreateTasksType = {
    item: TaskType[]
    data: {}
    messages: string[];
    resultCode: number;
}
export type UpdateTaskType = {
    data: {}
    item: TaskType[]
    messages: string[];
    resultCode: number;
}