import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from 'features/AuthByUserName/model/selectors/gettLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    // const loginForm = useSelector(getLoginState);

    // 11 - сразу деструктуризируем и достанем
    const { username, password } = useSelector(getLoginState);
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        // dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите username')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});

/*
5 - продолжение логики фичи AuthByUserName - дотаем диспатч чтобы экшены диспатчить в редюсер для изменения стейта
делаем функции (логику) onChangeUsername onChangePassword - то что на UI пользователь ввел в инпуты b передаем пропсом вниз
также надо передать вниз  пропсами value (тк его задиспатчили - он  в стейте глобальном поменялся) -
его надо сначало со стейта получить новое значение
6) - для этого делаем селекторы - 1 доставать весь стейт 2 - чтобы кусок нужный стейта

- компонент в мемо обернуть
- Не забываем поправить путь на относительный - в рамках модуля они относительные

11 - сразу деструктуризируем и достанем из Селектора данные
12 - открываем в бпаузере и проверяем: вводим в инпуты значения + в девтулзах(дебажим изменения состояния инпута) смотрим как вызываются экшены и значение
нового состояния + в нетворке как работает фича "логинизации"
13 - Делаем логику по нажатию на кнопку "Войти" после того как ввели данные в инпуты: onLoginClick передали в кнопку -
14 создаем асинхронный акшен=санку - для отправки запроса на сервер и возвращает в ответе какие-то данные
и эти данные в слайсе в экстраредюсере обрабатываем - см loginByUsername.ts...

 */
