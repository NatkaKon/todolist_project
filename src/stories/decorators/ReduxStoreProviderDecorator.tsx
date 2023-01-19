import {Provider} from 'react-redux'
import React from 'react'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate:'', order:0 },
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate:'', order:0 }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(), title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true

            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            },
            {
                id: v1(), title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                completed: true
            }
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
