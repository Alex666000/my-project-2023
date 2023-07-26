import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getLoginState } from '../../model/selectors/gettLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
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
    const {
        username, password, isLoading, error,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        // вызываем санку по нажатию на кнопку
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
            <Input
                autofocus
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
                disabled={isLoading}
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
- Не забываем поправить пути на относительные - в рамках модуля они относительные
11 - сразу деструктуризируем и достанем из Селектора данные
12 - открываем в бпаузере и проверяем: вводим в инпуты значения + в девтулзах(дебажим изменения состояния инпута) смотрим как вызываются экшены и значение
нового состояния + в нетворке как работает фича "логинизации"
13 - Делаем логику по нажатию на кнопку "Войти" после того как ввели данные в инпуты: onLoginClick передали в кнопку -
14 создаем асинхронный акшен=санку - для отправки запроса на сервер и возвращает в ответе какие-то данные
и эти данные в слайсе в экстраредюсере обрабатываем - см loginByUsername.ts...
- Не забываем поправить пути на относительные - в рамках модуля они относительные
- Вызываем санку по нажатию на кнопку строка 36 функция onLoginClick
- Запускаем девсервер чтоб было куда отправлять запросы + фронт запускаем - смотрим девтулзы и нетворк...и выполняем пункт 12 еше раз... и
дополнительно нажимаем на кнопку "Войти" и видим в консоле ошибку если 403 - запрещенные данные (ввели не соответствующий логин и пароль что в БД)
введем верные данне "username": "admin", "password": "123" и видим в нетворке что запрос login 200 ок
- Как дебажить ошибку:  18.30 мин 34 видео
- Обработаем isLoading - индикацию загрузки пока запрос идет и error: const {isLoading, error} = useSelector(getLoginState);
- в момент пока идет загрузка конку будем дизеиблить чтобы не могли нажать на нее несколько раз - добавим проп disabled для ui kit Button +
после добавим класс + стори на это новое состояние кнопки --
- Кнопку дизейблить будем по флагу isLoading -- disabled={isLoading}
- Обработаем ошибку - добавим блок div - если ошибка есть то его будем отрисовывать стр.45: {error && <div>{error}</div>}
- Выполняем п 12 - пробуем на UX воити.... видим дизейбл работает - и проверяем ошибку - введем не верные данные...готово, сделаем ошибку красного цвета
или UI kit Text -шем внутри стиль для error + стори для UI kit Text - заменяем div на Text:
{error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
- Логику по авторизации готова - но с данными которые получаем с сервака мы ничего не делаем - их надо сохранять в стейт
и в зависимости от того есть эти данные или нет  мы будем определять авторизован ли User или нет - идем в userSlice и в нем эти данные будем хранить
--> userSlice.ts в редюсеры обычные....

 */
