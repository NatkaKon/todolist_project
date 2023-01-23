import {TasksStateType} from '../../App';
import {tasksReducer} from './tasks-reducer';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    let todolist: TodolistDomainType = {
        title: 'New Todolist',
        id: 'anu id',
        order: 0,
        addedDate: '',
        filter: 'all',
        entityStatus:'idle'
    }

    const action = addTodolistAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
