export interface User {
    id: string;
    username: string;
    // password на фронте не храним поэтому в схему не добавляем
    avatar?: string // добавили новое поле в БД в объект users
}

// Сущность возвращаемая с бэкенда - тип для стейта
export interface UserSchema {
    // если authData есть - то User авторизован
    authData?: User;

    _inited?: boolean // значально false - после инициализации данных о пользователе будем делать true
}

/*
- Добавляем тип UserSchema в типизацию слайса
- _inited: boolean // значально false - после инициализации данных о пользователе как выполниться экшн
 initAuthData будем делать его true - смотри слайс...
- делаем селектор с помощью которого флаг получим, добавляем его в паблик апи
- на UI пользуемся флагом в Арр.tsx при

 */
