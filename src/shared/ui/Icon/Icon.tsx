import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>; // Компонент - ссылка до самой иконки
}

// Чтобы задавать для всех иконок в Арр правильный цвет - цвет иконки чтобы подстраивался под цвет темы
// Обертка над svg что отрисовывали ранее
export const Icon = memo((props: IconProps) => {
    const { className, Svg } = props;

    return (
        <Svg className={classNames(cls.Icon, {}, [className])} />
    );
});

/*
 - Пример использования на UI: <Icon Svg={EyeIcon} className={cls.icon} />
 */
