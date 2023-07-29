import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';

export interface SidebarItemType {
    // Эти пропсы содержимое разметки AppLink
    path: string // на который должна вести ссылка
    text: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>> // Компонент
    authOnly?: boolean
}

// конфиг массива ссылок - потом идем на ui и по нему итерируемся
export const SidebarItemsList: SidebarItemType[] = [
    // Объекты ведут на соответствующие страницы
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная',
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'О сайте',
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
    },
];
