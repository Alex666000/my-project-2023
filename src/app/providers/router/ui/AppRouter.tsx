import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routeConfig} from 'shared/config/routeConfig/routeConfig';


// Будет отображаться та или иная страница AppRouter - на экране у пользователя
const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* так как нам нужен массив значений то Object.values - тогда получим
                  нужные значения которые будем передавать как пропсы  в компонент Route*/}
                {Object.values(routeConfig).map(({path, element}) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <Suspense fallback={<div>Loading...</div>}>
                                {element}
                            </Suspense>
                        )}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
