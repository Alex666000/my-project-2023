import { FC, memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Applink.module.scss';

export const enum AppLinkTheme {
    PRIMARY = 'primary', // первичная тема
    SECONDARY = 'secondary', // вторичная тема с инвертед цветом
    RED = 'red'
}

interface AppLinkProps extends LinkProps {
    className?: string;
    // сделаем необязательной тк по дефолту ее ниже проинициализировали
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        className,
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, { [cls[theme]]: true }, [className])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
/*
extends - у компонента Link есть свои родные пропсы из react-router-dom и мы наш интерфейс унаследуем от этого LinkProps

если захотим передать еще др пропсы
 */
