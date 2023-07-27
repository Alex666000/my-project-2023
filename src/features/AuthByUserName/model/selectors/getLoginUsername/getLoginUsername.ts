import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginUsername = (state: StateSchema) => state?.loginForm?.username || '';

/*
- Селектор возвращает объект а он может быть === undefined и мы пытаемся из undefined  достать поля значит в консоле ошибка может быть:
"Uncaught TypeError: Cannot read properties of undefined (reading 'username')" -- чтобы такого не было надо внутри селектора возвращать дефолтный стейт
в LoginForm.tsx или для каждого поля  поля loginForm создаем селекторы
- для каждого отдельного поля стейта используем свои маленькии селектор
 */
