import { Article } from 'entities/Article';

// состояния стейта отвечающего за ее подгрузку данные и ошибки
export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}

/*
- Добавляем в паблик
 */
