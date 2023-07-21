import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Sidebar } from './Sidebar';

export default {
    // Компонент для  которой делаем истории
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar />;

// История для светлого Sidebar
export const Light = Template.bind({});
Light.args = { };

// История для тёмного Sidebar
export const Dark = Template.bind({});
Dark.args = { };
// Добавим декоратор для темы для конкретной истории
Dark.decorators = [ThemeDecorator(Theme.DARK)];
