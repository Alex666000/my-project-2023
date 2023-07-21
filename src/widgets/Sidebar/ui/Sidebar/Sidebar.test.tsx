import { fireEvent, screen } from '@testing-library/react';
import {
    renderWithTranslation,
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from 'widgets/Sidebar';

describe('Sidebar', () => {
    test('with only first param', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    // Для сворачивания и разворачивания Сайдбара
    test('test toggle', () => {
        renderWithTranslation(<Sidebar />);
        // на кнопку в компоненте вешаем testid - находим кнопку
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        // кликаем по кнопке
        fireEvent.click(toggleBtn);
        // ожидаем что класс для сворачивания навешался на элемент
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
