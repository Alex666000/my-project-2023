// Модалка внутри которой будет лежать LoginForm
import { memo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginFormAsync } from 'features/AuthByUserName/ui/LoginForm/LoginForm.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
    const {
        className,
        onClose,
        isOpen,
    } = props;

    const { t } = useTranslation();

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            {/* <LoginForm /> */}
            <Suspense fallback={<Loader />}>
                {/* на успешную авторизацию закрываем модалку */}
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
});

/*
- Пути на относительные: Модалка внутри себя подгружает асинхронно форму - у нас все изолировано...
- Итог: вынесли асинхронную форму и бандл стал меньше весить - сделали АСИНХРОННЫЙ КОМПОНЕНТ но редюсер все равно выходит наружу
тем самым основная часть логики что находится в редюсере  оставили в основном бандле сеичас будем решать это с редюсером
это нужно изолировать и вынести еще больше кода из гл.бандла - ускорим скорость загрузки Арр - компоненты которые можно подгрузить
отложенно: модалки страницы их  надо выносить в отд.чанки
- Выносим логику редюсеров в отдельные чанки
 */
