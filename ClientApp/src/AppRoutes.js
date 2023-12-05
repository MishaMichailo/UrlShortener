import React from 'react';
import Registration from "./components/Registration";
import URLpage from "./components/URLpage";
import Login from "./components/Login";
import ProtectedRoute from './ProtectedRoute';
import DataFromDb from './DataFromDb';

const AppRoutes = [
  {
    index : true,
    path: '/',
    element: <Login/>
  },
  {
    path: '/registration',
    element: <Registration/>
  },
  {
    path: '/urlpage',
    element: 
      <ProtectedRoute>
        <URLpage />
      </ProtectedRoute>
  },
  {
    path: '/datafromdb',
    element: <DataFromDb/>
  }
];

export default AppRoutes;
