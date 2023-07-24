import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';

// чтобы изолировано тестировать компоненты использующие переводы - добавляет тестируемый компонент в обертку
// и добавляет нужную конфигурацию дял переводов
export function componentRender(component: ReactNode) {
    return render(
        // I18nextProvider - из библы i18next-a...
        <I18nextProvider i18n={i18nForTests}>
            {component}
        </I18nextProvider>,
    );
}
