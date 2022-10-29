import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type FilterButtonType = 'all' | 'completed' | 'active'
export type TodoListsType = {
    id: string
    title: string
    filter: FilterButtonType
}

function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What bye', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest', isDone: false},
            {id: v1(), title: 'Graph', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'React2', isDone: false},
            {id: v1(), title: 'Rest2', isDone: false},
            {id: v1(), title: 'Graph2', isDone: false}
        ]
    });

    const changeStatus = (todoListID: string, id: string, newIsDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === id ? {...el, isDone: newIsDone} : el)})
    }
    const addTask = (todoListID: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        // setTasks([newTask, ...tasks])
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const addTodoList = (newTitle: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListsType = {id: newTodoListID, title: newTitle, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoListID]: [], ...tasks})
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }
    const changeFilter = (todoListID: string, filterValue: FilterButtonType) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filterValue} : el))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID] //подчищаем таски
    }

    return (
        <div className="App">

            <AddItemForm callBack={addTodoList}/>
            {todoLists.map(el => {
                let filteredTasks = tasks[el.id]

                if (el.filter === 'active') {
                    filteredTasks = tasks[el.id].filter(el => !el.isDone)
                }

                if (el.filter === 'completed') {
                    filteredTasks = tasks[el.id].filter(el => el.isDone)
                }


                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeInput={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
