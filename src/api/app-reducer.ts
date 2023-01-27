import {Dispatch} from 'redux';
import {authAPI} from './todolist-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError} from '../utils/error-utils';
import {AxiosError} from 'axios';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// status === 'loading' - показываем крутилку
// status === 'idle' | 'succeeded' | 'failed' - прячем крутилку

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isinitialized}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
}) as const

export const setAppErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    error
}) as const

export const setAppIsInitializedAC = (isinitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isinitialized
}) as const


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            debugger
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })
        .finally(()=> {
            dispatch(setAppIsInitializedAC(true))
        })
}


export type AppActionsType =
    SetAppStatusType
    | SetAppErrorType
    | SetAppIsInitializedType

export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>