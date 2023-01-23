import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../features/TodolistsList/Todolist/Task/Task';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args:{
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});

TaskIsDone.args = {
    task:{id:'aaaa', status:TaskStatuses.Completed, title:'JS',
        todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        completed: true}
};

export const TaskIsNotDone = Template.bind({});

TaskIsNotDone.args = {
    task:{id:'aaaabbb', status:TaskStatuses.New, title:'CSS',  todoListId: 'todolistId1',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        completed: true}
};

