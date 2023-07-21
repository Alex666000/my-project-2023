// сюда импортируем глобальные стили
import 'app/styles/index.scss';
import { Story } from '@storybook/react';

// Будет отвечать за подключение глобальных стилей
export const StyleDecorator = (story: () => Story) => story();
