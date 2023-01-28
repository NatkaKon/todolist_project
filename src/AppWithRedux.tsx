import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {AppDispatch, useAppSelector} from './api/store';
import {TaskType} from './api/todolist-api';
import {initializeAppTC, RequestStatusType} from './api/app-reducer';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import {Login} from './features/Login/Login';
import {TodolistsList} from './features/TodolistsList/TodolistsList';
import {Navigate, Route, Routes} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {logOutTC} from './features/Login/auth-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = AppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler =()=> {
        dispatch(logOutTC())
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
                    {/*    <Menu/>*/}
                    {/*</IconButton>*/}
                    {/*<Typography variant="h6">*/}
                    {/*    News*/}
                    {/*</Typography>*/}

                    {isLoggedIn  &&  <Button color="inherit" onClick={logOutHandler}>Log out</Button>      }

                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/404" element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default AppWithRedux;
