import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from 'pages/ArticlesDetailsPage/model/selectors/comments';
import { fetchCommentsByArticleId } from 'pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicModuleLoader, ReducersList } from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

function ArticlesDetailsPage(props: ArticlesDetailsPageProps) {
    const {
        className,
    } = props;

    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>(); // ожидаем объект с полем id (см структура БД...)
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComments.selectAll); // используем селектор что сделали в адаптере
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id)); // запрашиваем статью для которой хотим получить комменты
        // запрос на сервер сделали - обновляем slice в экстраредюсерах - там есть нюанс в обработке "фулфилд" из-за "адаптера" --> ...
    });

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t('Комментарии')} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
}

export default memo(ArticlesDetailsPage);

/*
При создании асинхронных компонент саму компоненту только по дефолту экспортим
создали страницы - потом обновляем конфиг роута
- получать id будем из строки запроса в зависимости от того что там написано 1,2,3 или любое число id..
для этого выцепим параметры динамические useParams()
---------------------------------------------------
51 видео:
- селекторы писать необходимости нет - 1 раз создали "адаптер"  и потом селекторы используем - только свои селекторы создаем
под подгрузку данных getArticleCommentsIsLoading и ошибку показать (отрисовать) - getArticleCommentsError
selectAll - получим весь массив комментов
 */
