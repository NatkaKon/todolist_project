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
        return instance.get('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`,)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    },
}

