export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string; // если ввели неправильный логин или пароль
}

/*
1- Создаем схему - описываем состояние для стейта который будет отвечать за форму авторизации
2- Создаем  слайс
 */
