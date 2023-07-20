import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

// Будет отображаться та или иная страница AppRouter - на экране у пользователя
const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {/* так как нам нужен массив значений то Object.values - тогда получим
                  нужные значения которые будем передавать как пропсы  в компонент Route */}
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <div className="page-wrapper">
                            {element}
                        </div>
                    )}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
