import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView, // принимаем для подсветки выбранного вида
    onViewClick?: (view: ArticleView) => void; // переключатель отображения
}

// объекты отвечающие за кнопки с отображением - сделали массив тк 2 поля в объекте
const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon, // плитка
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon, // список
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        className,
        view, // для подсветки выбранной иконки
        onViewClick,
    } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                    />
                </Button>
            ))}
        </div>
    );
});

/*
ButtonTheme.CLEAR - чтобы не было рамок  а отрисовать только иконку и слушатель нажатия
Чтобы на иконку могли кликнуть ее оборачиваем- в кнопку
 */
