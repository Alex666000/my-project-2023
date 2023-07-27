import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { loginActions, loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
}

// указывает с какими редюсерами будет работать
const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers} //
        >
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
        </DynamicModuleLoader>
    );
});
export default LoginForm;

/*
________________________________________________________________________________________________________________________________________________________________
   -----------> 35 ВИДЕО: 35 - Оптимизация бандла BundleAnalyzerPlugin Suspense  + 7 min как работать с асинхронными редюсерами
- Сделаем форму авторизации асинхронной рядом создаем асинхронный компонент LoginForm.async.ts - и теперь
компонент LoginForm экспортируем по дефолту
- Когда создали reducerManager

- Используем логику асинхронного редюсера со строки 25-30:
const store = useStore() as ReduxStoreWithManager;
    useEffect(() => {
        // в момент вмонтирования компонента нам надо с помощью reducerManager - редюсер необходимо добавить
        store.reducerManager.add('loginForm', loginReducer);
    }, [store.reducerManager]);

Теперь редюсер который мы экспортировали наружу в паблике фичи AuthByUserName можно удалить - он изолирован внутри модуля
и подключать его будем  внутри модуля асинхронно - компонент LoginForm сам асинхронный и этот редюсер будет подгружаться только со своим
асинхронным компонентом асинхронно - важно удалить этот редюсер когда компонент будет не нужен - очищаем useEffect (в массив зависимостей ничего добавлять
 не надо тк ожидается что эффект должен отработать  только 1 раз при вмонтировании компонента)

- Подитожим теорию: в момент вмонтирования компонента мы добавляем редюсер потом когда компонент уже не нужен  когда он демонтируется реактом
мы этот редюсер снова удаляем --- смотри как это работает в нетворке  20 мин...
- для каждого отдельного поля стейта используем свои маленькии селектор
- Импорты на относительные...
- Таким образом асинхронно редюсер вмонтировали в наш стейт
- Выносим подключение редюсера что в useEffect-е -- в DynamicModuleLoader (компонент где логику по подключению редюсеров
изолируем) -- далее оборачиваем наш компонент в DynamicModuleLoader -  передаем в него соответствующие пропсы
 */
