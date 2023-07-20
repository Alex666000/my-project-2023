import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';

// список роутов нашего Арр
export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'not_found',
}

// объект где для каждого маршрута укажем путь до соответствующего компонента
// AppRoutes - название самого пути
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    // * - все маршруты если ни один из маршрутов ранее не отработал
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

// объявим сами роуты (как на UI ранее прописывали) маршрут для них и компонент
// в качестве ключа AppRoutes, а значения - тип RouteProps - тип из RRD
export const routeConfig: Record<AppRoutes, RouteProps> = {
    // заполняем конфиг
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    // последний
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
/*
 - RouteProps - это path и element
 */
