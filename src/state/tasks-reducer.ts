import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

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
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ? {...el, ...action.payload.model} : el)
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
                [action.todolist.id]: []
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
        case 'SET-TASKS': {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        default:
            return state
    }
}

// actions
export const deleteTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    payload: {id, todolistId}
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    payload: {task}
} as const)
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    payload: {
        id, model, todolistId
    }
} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: 'SET-TASKS',
    payload: {
        tasks, todolistId
    }
} as const)


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
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, id)
        .then(() => {
            dispatch(deleteTaskAC(id, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export type UpdateDomainTaskModelType = {
    title?:string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, id: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const task = tasks[todolistId].find(t => t.id === id)

    if (task) {
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status:task.status,
            ...domainModel

        }
        todolistAPI.updateTask(todolistId, id, apiModel)
            .then(() => {
                dispatch(updateTaskAC(id, domainModel, todolistId))
            })
    }
}

//types
type RemoveTasksActionType = ReturnType<typeof deleteTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type ChangeTaskSTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
    | RemoveTasksActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskSTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType