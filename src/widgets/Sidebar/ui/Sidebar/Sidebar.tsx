import React, {memo, useState} from 'react';
import cls from './Sidebar.module.scss';
import {classNames} from 'shared/lib/classNames/classNames';
import {ThemeSwitcher} from 'shared/ui/ThemeSwitcher';


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {className} = props;

    // состояние свернут Сайдбар или развернут
    // по умолчанию развернут
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed(prevState => !prevState);
    };

    return (
        <div className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
            <button onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
                {/* <LangSwitcher /> */}
            </div>

        </div>
    );
});
/*
сложные папки fsd -- так как Сайдбар сложный компонент в нем может быть много компонентов не только Sidebar.tsx о создаем в папке ui папку Sidebar
напримр SidebarItem SidebarHeader и тд

По условию будем навешивать класс collapsed и этот класс будет зависеть от этого состояния [cls.collapsed] - если [cls.collapsed]
 = true то класс collapsed навешиваем если фолс то удаляем

По нажатию на кноку Сайдбар сворачивается и разворачивается на ширину класса collapsed
 */
