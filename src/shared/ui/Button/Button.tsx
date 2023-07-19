import {ButtonHTMLAttributes, FC, memo} from 'react';
import cls from './Button.module.scss';
import {classNames} from 'shared/lib/classNames/classNames';

export enum ThemeButton {
    // кнопка без всего просто текст без рамки  без цвета заднего фона
    CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    // кнопки тоже будут с разными темами
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = memo((props) => {
    const {
        className,
        theme,
        children,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
/*
extends ButtonHTMLAttributes<HTMLButtonElement> - унаследуемся от типа - чтобы все типы что есть по умолчанию у кнопки передать в наш компонент
...otherProps - передаем все эти стандартные пропсы: ...otherProps + extends используются вместо
 */
