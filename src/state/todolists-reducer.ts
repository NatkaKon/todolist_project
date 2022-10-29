import {TodoListsType} from '../App';
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
            // setTodoLists([newTodoList, ...todoLists])
            // setTasks({[newTodoListID]: [], ...tasks})
        }
        default:
            return state
    }
}

type mainType = removeTodoListACType | addTodoListACType

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

// type changeTodoListTitleType = ReturnType<typeof changeTodoListTitleAC>
// export const changeTodoListTitleAC = (newTodoListTitle: string) => {
//     return {
//         type: 'ADD-TODOLISTS',
//         payload: {
//             title: newTodoListTitle
//         }
//     } as const
// }