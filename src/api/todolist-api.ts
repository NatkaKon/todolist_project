import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '8d054d58-f071-4339-8c40-d8b1679095b2',
    },
}

export const todolistAPI = {
    getTodolist() {
        return axios.get(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            settings
        )
    },
    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            settings
        )
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
    },
    updateTodolist(todolistId: string, title: string) {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title},
            settings
        )
    },
}

