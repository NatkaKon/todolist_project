import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from './todolists-reducer';
import {v1} from 'uuid';

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ? {...el, isDone: action.payload.isDone} : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach(el => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        default:
            return state
    }
}

// actions
export const removeTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    payload: {id, todolistId}
} as const)
export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD-TASK',
    payload: {title, todolistId}
} as const)
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        id, isDone, todolistId}
} as const)
//удалить потом вместо нее update
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        id, title, todolistId}
} as const)


//types
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
    | SetTodolistsType