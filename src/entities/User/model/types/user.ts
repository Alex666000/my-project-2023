export interface User {
    id: string;
    username: string;
    // password на фронте не храним поэтому в схему не добавляем
}

// Сущность возвращаемая с бэкенда - тип для стейта
export interface UserSchema {
    // если authData есть - то User авторизован
    authData?: User;
}

/*
- Добавляем тип UserSchema в типизацию слайса
 */
