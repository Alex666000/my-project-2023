import { StateSchema } from 'app/providers/StoreProvider';

// Авторизован ли Юзер?
export const getUserAuthData = (state: StateSchema) => state.user.authData;

/*
- не забываем добавить селектор в паблик
 */
