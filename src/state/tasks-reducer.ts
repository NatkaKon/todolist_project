import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';

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
                    status: TaskStatuses.New,
                    todoListId: action.payload.todolistId,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: '',
                    completed: true
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ? {...el, status: action.payload.status} : el)
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
        case 'SET-TASKS':{
            return {
                ...state,
                [action.payload.todolistId]:action.payload.tasks
            }
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
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        id, status, todolistId
    }
} as const)
export const SetTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: 'SET-TASKS',
    payload: {
        tasks, todolistId
    }
}as const)

//удалить потом вместо нее update
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        id, title, todolistId
    }
} as const)


//thunks

export const fetchTasksThunkTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(SetTasksAC(res.data.items, todolistId))
        })
}
export const fetchDeleteTaskThunkTC = (todolistId: string,id:string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, id)
        .then(() => {
            dispatch(removeTaskAC( id, todolistId))
        })
}


//types
type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskSTitleType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof SetTasksAC>

type ActionsType =
    | RemoveTasksActionType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskSTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | SetTasksActionType