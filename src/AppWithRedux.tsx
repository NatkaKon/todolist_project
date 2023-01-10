import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, getTodolistsTC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType, removeTodolistTC, addTodolistTC,
} from './state/todolists-reducer';
import {
    changeTaskTitleAC, addTaskTC,
    deleteTaskTC, fetchUpdateTaskThunkTC
} from './state/tasks-reducer';
import {AppDispatch, useAppSelector} from './state/store';
import {TaskStatuses, TaskType} from './api/todolist-api';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    let tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = AppDispatch()


    const removeTask=useCallback((id: string, todolistId: string)=> {
        dispatch(deleteTaskTC(todolistId,id))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((id: string, status:TaskStatuses, todolistId: string) => {
        dispatch(fetchUpdateTaskThunkTC(todolistId, id, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
