import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer, // указываем редюсер
};

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                {t('PROFILE PAGE')}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;

/*
- чтобы оживить страницу надо ее добавить в routeConfig
- добавляем страницу асинхронно в паблик апи: короткии путь относительно pages: import { ProfilePage } from 'pages/ProfilePage';
а не такой длинный import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
- оборачиваем в DynamicModuleLoader -- изолировать редюсер будем на уровне страницы и в поле reducers
укажем нужный для нас редюсер - его ТС не подхватывает - идем в StateSchema и добавим там поле: profile?: ProfileSchema ---
теперь в константе reducers, ТС подхватит редюсер profile -- передаем reducers в reducers:  reducers={reducers} +
передаем removeAfterUnmount - чтобы не хранить редюсер при демонтировании компонента когда ушли с этои страницы
- в StoreDecorator по дефолту добавляем profile: profileReducer, чтобы по деефолту он у нас был проинициализирован
 */
