import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';

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
    task:{id:'aaaa', isDone:true, title:'JS'}
};

export const TaskIsNotDone = Template.bind({});

TaskIsNotDone.args = {
    task:{id:'aaaabbb', isDone:false, title:'CSS'}
};

