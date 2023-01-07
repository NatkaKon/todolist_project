import {TodolistType} from '../App';
import {v1} from 'uuid';

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
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
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
export const RemoveTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const AddTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
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



//types
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTodolistsType=ReturnType<typeof SetTodolistsAC>;

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | SetTodolistsType