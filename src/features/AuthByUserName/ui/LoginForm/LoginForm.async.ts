import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));

/*
- Путь до компонента import('./LoginForm')
- компонент LoginForm экспортируем по дефолту
- Асинхронный компонент мы сделали - теперь добавим в LoginModal - там где используется LoginForm - вместо
обычного  асинхронный компонент - но перед этим обернем его в Suspense
 */
