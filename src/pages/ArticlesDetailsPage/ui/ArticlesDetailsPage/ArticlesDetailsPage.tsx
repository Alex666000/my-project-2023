import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
    className?: string;
}

function ArticlesDetailsPage(props: ArticlesDetailsPageProps) {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
            ArticlesDetailsPage
        </div>
    );
}
export default memo(ArticlesDetailsPage);
/*
При создании асинхронных компонент саму компоненту только по дефолту экспортим
создали страницы - потом обновляем конфиг роута
 */
