import { Comment } from 'entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean; // данные что пишем в "инишлстейт" slice-a
    error?: string
}
/*
- Делаем тип данных что вернет нам сервер - данные которые запросим
- Отдаем тип в паблик апи наруже чтоб использовать
- потом добавляем тип в StateSchema - в ипы для асинхронных редюсеров
-
 */
