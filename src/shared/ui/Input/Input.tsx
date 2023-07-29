import React, {
    ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'> {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void; // будем value менять и возвращать его наверх
    // открываем Модалку и автоматом ставится фокус в инпут
    autofocus?: boolean;
    readonly?: boolean // 41 видео 11 мин делаем для инпута readonly проп  - чтобы пока не нажмем на кнопку редактировать в инпут не могли ничего вписать
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false); // каретка только когда инпут в фокусе
    const [caretPosition, setCaretPosition] = useState(0);

    const isCaretVisible = isFocused && !readonly;

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // Тк функция это объект то можно применить как к объекту вызываем проп onChange
        // который передаем из вне - если проп не передан то функция вызвана небудет
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly, // если readonly=true то добавляем класс readonly к cls...
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
});

/*
- Omit: тк в стандартном типе уже есть пропсы value, onChange - а мы их в пропсах что принимаем объявили самостоятельно
так они еще у нас немного отличаются = конфликт типов - используем Omit - забрать из типа все пропсы но исключить
те которые нам не нужны -- исключили оба свойства: 'value' | 'onChange'
- стандартная функция "onChange"
 аргументом принимает event - а мы наверх хотим сразу отдавать value
- нам зачем нужен наверху event - если мы хотим поменять значение
- memo -- позволяет избежать лишних перерисовок
- ...otherProps -- все дефолтные пропсы инпута которые мы не объявляли явно
обязательно остальные пропсы деструктуризируем тк extends наследовали их
- ref -- если в инпут что-то написать то ничего не появится в инпуте- тк мы  каретку отобразили но физически
в инпут фокус не поставили - работаем с ДОМ деревом рефами: теперь физически в этот инпут фокус добавит:
ref.current?.focus();
 */
