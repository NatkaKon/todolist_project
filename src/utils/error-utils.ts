import {AppActionsType, setAppErrorAC, setAppStatusAC} from '../state/app-reducer';
import {Dispatch} from 'redux';

export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: any) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}