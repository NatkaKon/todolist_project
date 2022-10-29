import {v1} from 'uuid';
import {FilterButtonType, TodoListsType} from '../App';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todolists-reducer';


test.skip('correct todolist should be removed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What bye', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test.skip('correct todolist should be added', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newTodoListTitle = 'New Todolist'

    const startState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What bye', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)

})

test('correct todolist should change its name', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newTodoListTitle = 'New Todolist'

    const startState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What bye', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListID2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)

})

test('correct filter of todolist should change changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newFilter: FilterButtonType = 'completed'

    const startState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What bye', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})