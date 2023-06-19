import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/index';
import TypingPage from './pages/TypingPage/index';
import NotFound from 'pages/NotFound';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/Typing/',
    element: <TypingPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router} />);
