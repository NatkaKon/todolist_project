import {TodolistType} from '../api/todolist-api';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// status === 'loading' - показываем крутилку
// status === 'idle' | 'succeeded' | 'failed' - прячем крутилку

const initialState = {
    status: 'loading' as RequestStatusType
}
type InitialStateType = typeof initialState

export const appReducer=(state:InitialStateType=initialState, action: AppActionsType)=> {
    switch (action.type){
        case 'APP/SET-STATUS':
        return {...state, status:action.status}
        default:
            return state
    }
}


export type AppActionsType=SetAppStatusType

type SetAppStatusType = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC=  (status:RequestStatusType) => ({
    type: 'APP/SET-STATUS',
   status
} as const)