import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number; // принимаем его размеры из вне
    alt?: string;
}

export const Avatar = ({
    className,
    src,
    size,
    alt,
}: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({ // размеры для авы задаем как inline стили (объект)
        width: size || 100, // ширина и высота одинаковые тк иконка круглая
        height: size || 100,
    }), [size]);

    return (
        <img
            src={src}
            alt={alt} // пропс отрисовывается если ава не подгрузилась
            style={styles} /* размеры для авы задаем как inline стили */
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};

/*
style приоритетнее className
 */
