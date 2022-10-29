import {FilterButtonType, TodoListsType} from '../App';
import {v1} from 'uuid';

export const todoListsReducer = (state: TodoListsType[], action: mainType) => {
    switch (action.type) {
        case'REMOVE-TODOLIST': {
            //setTodoLists(todoLists.filter(el => el.id !== todoListID))
            return state.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TODOLISTS': {
            const newTodoListID = v1()
            const newTodoList: TodoListsType = {id: newTodoListID, title: action.payload.title, filter: 'all'}
            return [...state, newTodoList]

        }
        case 'CHANGE-TODOLIST-TITLE'  : {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER'  : {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filterValue} : el)
        }
        default:
            return state
    }
}

type mainType = removeTodoListACType | addTodoListACType | changeTodoListTitleType | changeTodoListFilterType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID1
        }
    } as const
}


type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodoListTitle: string) => {
    return {
        type: 'ADD-TODOLISTS',
        payload: {
            title: newTodoListTitle
        }
    } as const
}

type changeTodoListTitleType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListID2: string, newTodoListTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todoListID2,
            title: newTodoListTitle
        }
    } as const
}

type changeTodoListFilterType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todoListID2: string, newFilter: FilterButtonType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todoListID2,
            filterValue: newFilter
        }
    } as const
}