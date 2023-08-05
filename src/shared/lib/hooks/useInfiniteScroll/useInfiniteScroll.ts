import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void; // колбек - вызовется когда пересекли элемент
    triggerRef: MutableRefObject<HTMLElement>; // пересекли элемент на котором этот реф и вызвали колбек
    wrapperRef: MutableRefObject<HTMLElement>; // внутри него скролл - Page у нас...
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement, // элемент в котором скролл
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => { // колбек вызовется в тот момент  когда на экране появился элемент за которым мы следим
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}

/*
entry - массив элементов за которыми наблюдаем
 */
