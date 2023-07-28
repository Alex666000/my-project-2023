import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

// По условию можем разделять какой адрес у нас используется - либо "продакшн" или локалхост в "деве"...
// const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'http://productionSlim666.ru';
// baseURL: __API__,

export const $api = axios.create({
    baseURL: __API__, // деалем еще одну глобальную переменную которая зависит от сборки
    // заголовок который требуется для получения каких-либо данных авторизованным пользователем
    headers: {
        // достаем из ЛС по ключу данные которые там хранятся
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});

/*
- создаем инстанс аксиоса
- headers - открывем сервер стр.46 -  требуется заголовок authorization -  сам токен внутри заголовка  не проверяется
проверяется наличие самого заголовка (имитация авторизации)
- далее идем в санку loginByUsername - тут надо получить доступ до инстанса что мы сделали
 */
