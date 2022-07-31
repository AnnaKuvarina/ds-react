import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from '../core/configs/routing.config';

const App: FC = () => {
  return (
    <Routes>
      {routes.map(({ path, component: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
    </Routes>
  );
};

export default App;
