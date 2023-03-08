import router from 'Frontend/routes.js';
import { RouterProvider } from 'react-router-dom';
import React from 'react';

export default function App() {

  return <RouterProvider router={router} />;
}
