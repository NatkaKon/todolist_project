import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType={...action.todolist,filter:'all' }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id === action.id ? {...el, title:action.title}: el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=>el.id === action.id ? {...el, filter:action.filter}: el)
        case 'SET-TODOS':
            return action.todos.map(el => ({...el, filter: 'all'}))
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

//thunks

export const getTodolistsTC=()=> (dispatch: Dispatch)=> {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(SetTodolistsAC(res.data))
        })
}
export const removeTodolistTC=(todolistId:string)=> (dispatch: Dispatch)=> {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC=(title:string)=> (dispatch: Dispatch)=> {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC=(todolistId:string, title:string)=> (dispatch: Dispatch)=> {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(ChangeTodolistTitleAC(todolistId, title))
        })
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType =ReturnType<typeof SetTodolistsAC>;

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | SetTodolistsActionType