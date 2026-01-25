import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from 'pages/NotFound';

// Route-based code splitting
const MainPage = lazy(() => import('./pages/MainPage/index'));
const TypingPage = lazy(() => import('./pages/TypingPage/index'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: '/Typing/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TypingPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router} />);
