import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import ArticlesPage from 'pages/ArticlesPage/ui/ArticlesPage/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticlesDetailsPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean; // если true то маршрут доступен только авторизованным  пользователям
}

// типы (перечисления) для новых маршрутов
export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    // last
    NOT_FOUND = 'not_found',
}

// пути для новых маршрутов
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id  -- добавляем id статьи которую мы просматриваем -
    // комментом покажем что должен быть id - его добавим ниже
    // последний...
    [AppRoutes.NOT_FOUND]: '*',
};

// Объект по которому пробегаемся на UI и отрисовываем нужный компонент
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true, // для профайла включаем приватный что маршрут (не для всех...только для зареганных...)
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`, // динамически указываем id статьи в строке запроса  и эту статью получим
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};

/*
- Тут обновляем конфиг роута после того как создали страницы, сделали их асинхронными компонентами потом тут обновляем конфиг
чтобы могли на страницы переходить
- добавили маршрут - открываем браузер и смотрим что маршрут отрабатывает: http://localhost:3000/profile
- делаем приватный маршрут для Профиля
- далее идем в AppRouter - сделаем логику где не нужные маршруты отфильтровываем
 */
