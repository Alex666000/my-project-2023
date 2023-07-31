import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
    >(
        'articleDetails/fetchCommentsByArticleId',
        async (articleId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            if (!articleId) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<Comment[]>('/comments', {
                    params: { // квери параметры в аксиос подставляем там
                        articleId,
                        _expand: 'user', // по id пользователя получить полную инфу о нем - мы для того чтобы отобразить аву и username Юзера который
                        // оставим коммент - запрашиваем полную сущность пользователя см структуру в БД или  40 мин 51 видео
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );

/*
- используем санку в компоненте
 */
