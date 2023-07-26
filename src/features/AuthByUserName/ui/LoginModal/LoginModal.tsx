// Модалка внутри которой будет лежать LoginForm
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import cls from './LoginModal.module.scss';

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
            <LoginForm />
        </Modal>
    );
});

/*
- Не забываем поправить путь на относительный - в рамках модуля они относительные
- Теперь модалку надо отдать наружу в паблик апи фичи - а сама форма <LoginForm />
остается изолирована внутри этого модуля
- в "Навбаре" теперь вместо той модалки Modal - используем LoginModal
 */
