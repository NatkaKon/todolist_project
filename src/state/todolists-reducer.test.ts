import {v1} from 'uuid';
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

let todoListID1: string
let todoListID2: string

let startState: TodolistDomainType[]

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()

    startState = [
        {id: todoListID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus:'idle'},
        {id: todoListID2, title: 'What bye', filter: 'all', addedDate: '', order: 0, entityStatus:'idle'},
    ]

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {
    let todolist: TodolistDomainType = {
        id: 'any id',
        title: 'New Todolist',
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus:'idle'
    }

    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)

})

test('correct todolist should change its name', () => {

    let newTodoListTitle = 'New Todolist'

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todoListID2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)

})

test('correct filter of todolist should change changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todoListID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})