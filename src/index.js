import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import { AuthProvider } from './contexts/authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <App/>
  },
  {
    path: "profile",
    element: <Profile/>,
  },
  {
    path: "auth",
    element: <Login/>,
  },
  {
    path: "/profile/auth",
    element: <Login/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
