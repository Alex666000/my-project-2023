import { StateSchema } from 'app/providers/StoreProvider';

// Достает весь стейт loginForm - который отвечает за нашу форму
export const getLoginState = (state: StateSchema) => state?.loginForm;

/*
- LoginSchema - добавить в паблик
- 7) Чтобы тут loginForm из стейта всего Арр достать надо подключить ее к корневой схеме в StateSchema

- 10) Теперь вернемся к компоненту и селектором воспользуемся (селекторы разбивать на много селекторов: делать отдельно для логина отдельно для пароля
отдельно для isLoading error и тд - но в учеьных целях обоидемся 1 селектором тк форма маленькая)
 */
