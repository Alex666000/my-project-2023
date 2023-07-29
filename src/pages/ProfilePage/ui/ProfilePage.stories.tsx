import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

/*
- Сложные истории смотри это чтоб понять как эта история писалась:
2.40 мин 43 видео - если в консоле сторибука ошибка  то запрос на сервер был отправлен -
 в СБ мы не хотим спмить запросами на сервер  и отправлять их и нам надо  это предотвратить - будем разделять среды в которых  у нас выполняется код
3 мин 43 видео -- добавим глобальную переменную project (НАИКРУТЕЙШИЙ ПРИМЕР!!!) - будем разделять среды в которых  у нас выполняется код - этот project - сможем в каждой из среды переопределить
- __PROJECT__  -добавили еще одну глобальную переменную
теперь у нас 3 среды которые по глобальной переменной мы можем отличать
 */
