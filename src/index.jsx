import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/index';
import TypingPage from './pages/TypingPage/index';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/Typing/',
    element: <TypingPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')); //여기서 시작된다
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
