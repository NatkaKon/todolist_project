import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            }
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            }
        ]
    });


    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, status, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId, value))
    }

    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolists(ChangeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

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
                                tasksForTodolist = allTodolistTasks.filter(t => t.status=== TaskStatuses.New);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status=== TaskStatuses.Completed);
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

export default AppWithReducer;
