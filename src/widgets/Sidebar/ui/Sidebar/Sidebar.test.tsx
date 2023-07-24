import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('with only first param', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    // Для сворачивания и разворачивания Сайдбара
    test('test toggle', () => {
        componentRender(<Sidebar />);
        // на кнопку в компоненте вешаем testid - находим кнопку
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        // кликаем по кнопке
        fireEvent.click(toggleBtn);
        // ожидаем что класс для сворачивания навешался на элемент
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
