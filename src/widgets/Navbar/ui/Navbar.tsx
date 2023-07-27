import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // получили из стейта authData
    const authData = useSelector(getUserAuthData);

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    // вызываем на кнопку выйти
    const onLogout = useCallback(() => {
        // диспатчим экшен который сделаем: идем делать экшн - logout() в userSlice.ts
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onLogout}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </div>
    );
};
/*
- Если пользователь авторизован то скрываем кнопку Воити - делаем селектор для получения authData в сущности User делаем селектор: getUserAuthData
- User название самой сущности AuthData азвание самого поля
- возвращаем разные разметки для авторизованного Юзера и нет - на UX покажем конку Воити или Выйти...

-  Итог: у нас есть сущность User которая отвечает авторизован ли Юзер или нет? И внутри себя она хранит данные об этом пользователе -
для формы авторизации сделали отдельную фичу  которая изолирует внутри себя  данные формы LoginForm ошибки индикацию загрузки -
идем внутри фичи AuthByUserName использовали сущность пользователя - это ниже лежащии слой entities

 */
