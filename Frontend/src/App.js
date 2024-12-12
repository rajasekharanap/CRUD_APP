import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './UserContext';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Error from './components/Error';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import Create from './components/Usercreate';


const AppLayout = () => {
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Login/>,
            },
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/signup",
                element: <Signup/>,
            },
            {
                path: "/admin",
                element: <Admin/>,
            },
            {
                path: "/create",
                element: <Create/>,
            },
        ],
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
        <RouterProvider router={ appRouter }/>
    </UserContextProvider>
);