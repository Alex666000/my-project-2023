import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
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
Light.decorators = [
    StoreDecorator({
        user: { authData: {} },
    }),
];

// История для тёмного Sidebar
export const Dark = Template.bind({});
Dark.args = { };
// Добавим декоратор для темы для конкретной истории
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: { authData: {} }, // от этого поля зависит  то как будет отображаться Сайдбар
    }),
];

// Сайдбар для не авторизованного Юзера:
export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
    StoreDecorator({
        user: {}, // пустой- тк пользователь не авторзован и Сайдбар будет выглядеть по другому
    }),
];

/*
- скриншоты выявили что у нас не было StoreDecorator-ф 43 видео 26 мин...
- StoreDecorator - с помощью него можем объявить инишл стейт
 */
