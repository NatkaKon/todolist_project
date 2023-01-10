import {v1} from 'uuid';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

let todoListID1:string
let todoListID2:string

let startState: TodolistDomainType[]

beforeEach(()=> {
    todoListID1 = v1()
    todoListID2 = v1()

     startState = [
        {id: todoListID1, title: 'What to learn', filter: 'all', addedDate:'', order:0},
        {id: todoListID2, title: 'What bye', filter: 'all', addedDate:'', order:0},
    ]

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todoListID1))

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