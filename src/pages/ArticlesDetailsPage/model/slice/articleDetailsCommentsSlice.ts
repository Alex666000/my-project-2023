import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from 'entities/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchCommentsByArticleId } from 'pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from 'pages/ArticlesDetailsPage';

const commentsAdapter = createEntityAdapter<Comment>({ // createEntityAdapter - РТК
    selectId: (comment) => comment.id, // получаем id - поле по которому будет идти нормализация - у нас по дефолту просто id -делаем селектор для этого поля
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>( // селекторы getArticleComments получения наших комментов
// (будем внутри их компонент использовать)
    (state: any) => state.articleDetailsComments || commentsAdapter.getInitialState(), // достаем нужный участок стейта -
// articleDetailsComments
);

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({ // с помощью адаптера передаем "инишл стейт" наш...
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {
                state.isLoading = false;
                // state.data = action.payload;
                commentsAdapter.setAll(state, action.payload); // адаптер сам добавит ids, нормализует данные
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
/*
- переходим к компоненту на UI и оборачиваемв ДайнемикМодульЛоудер... и
const comments = useSelector(getArticleComments.selectAll); // используем на UI селектор что сделали в адаптере
 */
