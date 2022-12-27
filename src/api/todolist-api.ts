import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '8d054d58-f071-4339-8c40-d8b1679095b2',
    },
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title},)
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
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<DeleteTasksType>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<CreateTasksType>(`/todo-lists/${todolistId}/tasks`, {title},)
    },
}


export type TodoType = {
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
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type DeleteTasksType = {
    resultCode: number
    messages: string[],
    data: {}
}
export type CreateTasksType = {
    item: TaskType[]
    data:{}
    messages: string[];
    resultCode: number;
}