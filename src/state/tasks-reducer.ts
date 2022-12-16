import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {v1} from 'uuid';
// import {TaskType} from '../Todolist';
// import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskSTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTasksActionType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskSTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
              [action.payload.todolistId]:[{id:v1(), title: action.payload.title, isDone:false}, ...state[action.payload.todolistId]]
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todolistId: todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistId: todolistId
        }
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id, isDone, todolistId
        }
    } as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id, title, todolistId
        }
    } as const
}

