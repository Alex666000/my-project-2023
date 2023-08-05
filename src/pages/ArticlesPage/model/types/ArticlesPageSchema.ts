import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView; // вид отображения плиткой или  больших блоков
    page: number
    limit?: number // кол-во элементов которые подгружаем за раз
    hasMore: boolean // загрузили все статьи или еще есть порция?
}
