import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppActionsType, RequestStatusType, setAppStatusAC} from './app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'SET-TODOS':
            return action.todos.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(el => el.id === action.todoId ? {...el, entityStatus: action.status} : el)
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
} as const)
export const SetTodolistsAC = (todos: TodolistType[]) => ({
    type: 'SET-TODOS',
    todos
} as const)
export const ChangeTodolistEntityStatusAC = (todoId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoId, status
}) as const


//thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(SetTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(ChangeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(ChangeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof SetTodolistsAC>;
export type ChangeTodolistEntityStatusType = ReturnType<typeof ChangeTodolistEntityStatusAC>;

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | SetTodolistsActionType
    | AppActionsType
    | ChangeTodolistEntityStatusType