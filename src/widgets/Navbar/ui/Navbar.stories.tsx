import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Navbar } from './Navbar';

export default {
    // Компонент для  которой делаем истории
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

// История для светлого Navbar
export const Light = Template.bind({});
Light.args = { };

// История для тёмного Navbar
export const Dark = Template.bind({});
Dark.args = { };
// Добавим декоратор для темы для конкретной истории
Dark.decorators = [ThemeDecorator(Theme.DARK)];
