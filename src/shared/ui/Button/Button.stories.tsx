import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

export default {
    // Компонент для которой делаем истории
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// История для обычной кнопки
export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

// История для кнопки с темой CLEAR
export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
};

// История для кнопки с темой Outline
export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
/*
- Сторибук - это витрина компонентов
- Состоит: из названия сториса компонента что хотим отрисовать и состояния разные компонента в зависимости от пропсов - в зависимости от разных пропсов компонент выглядит по разному. Сторибуки есть чтобы любои мог посмотреть что из себя представляет компонент и какие у него есть состояния
 */
