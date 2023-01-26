import {Dispatch} from 'redux';
import {authAPI} from './todolist-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError} from '../utils/error-utils';
import {AxiosError} from 'axios';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// status === 'loading' - показываем крутилку
// status === 'idle' | 'succeeded' | 'failed' - прячем крутилку

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


export type AppActionsType = SetAppStatusType | SetAppErrorType

export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
}) as const

export const setAppErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    error
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
        .catch((err: AxiosError)=>{
            handleServerAppError(dispatch, err.message)
        })
}
