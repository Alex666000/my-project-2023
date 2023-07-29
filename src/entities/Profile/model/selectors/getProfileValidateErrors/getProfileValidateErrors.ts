import { StateSchema } from 'app/providers/StoreProvider';

// Селектор для получения массива ошибок
export const getProfileValidateErrors = (state: StateSchema) => state.profile?.validateErrors;
