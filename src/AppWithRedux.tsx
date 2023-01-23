import React  from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/icons-material/Menu';
import { useAppSelector} from './api/store';
import { TaskType} from './api/todolist-api';
import {RequestStatusType} from './api/app-reducer';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import {Login} from './features/Login/Login';
import {TodolistsList} from './features/TodolistsList/TodolistsList';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
                <Login/>
            </Container>
        </div>
    );
}

export default AppWithRedux;
