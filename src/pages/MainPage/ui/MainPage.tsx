import React from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {/* MainPage */}
            {t('Главная страница')}
        </div>
    );
};

export default MainPage;

/*
useTranslation() - Всегда пишем на русском потом в переводы добавляем переводы
 */
