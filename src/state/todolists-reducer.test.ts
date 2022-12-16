import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';

let todoListID1:string
let todoListID2:string

let startState: TodolistType[]

beforeEach(()=> {
    todoListID1 = v1()
    todoListID2 = v1()

     startState = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What bye', filter: 'all'},
    ]

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {

    let newTodoListTitle = 'New Todolist'

    const endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)

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