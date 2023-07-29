import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer, ValidateProfileError,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer, // указываем редюсер
};

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    // данные которые получили с сервера которые изменятся не должны - делаем селектор для передачи вниз form...
    // const data = useSelector(getProfileData);
    const formData = useSelector(getProfileData);
    const form = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    // получаем валидационные ошибки - и отрисовываем их
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = { // маппинг === объект -- этот объект просто сапоставление = мапинг
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') { // в сторибуке не надо запрос отправлять
            dispatch(fetchProfileData()); // запрашиваем данные о пользователе, смотрим в девтулзах что запрос прошел успешно
            // потом  эти состояния пендинг и фулфилд что в девтулзах получили - обработать в экстраредюсерах нашего слайса
        }
    }, [dispatch]);

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]} // тут где рендерим ошибки по ключу к объекту обращаемся и в качестве ключа передаем саму
                        // ошибку по ключу вернется само значение а значением является перевод  - этот объект просто сапоставление = мапинг
                    />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    readonly={readonly}
                    onChangeCity={onChangeCity}
                    onChangeAge={onChangeAge}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
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
- маппинг (мапинг) === объект - в качестве ключа значение ошибки а значения указывать перевод -- чтоб на UX текст ошибок был читабельный
а не такой как к примеру страшный текст: 'INCORRECT_COUNTRY'

 */
