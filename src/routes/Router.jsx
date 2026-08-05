import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../components/RootLayout'
import NotFound from '../pages/NotFound'
import Products from '../pages/Products'
import Home from '../pages/Home'
import ProductDetails from '../components/ProductDetails'

export const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        errorElement:<NotFound/>,
        children:[
            {
                index:"true",
                element:<Home/>
            },
            {
                path:"/products",
                element:<Products/>
            },  {
                path:"/products/:id",
                element:<ProductDetails/>
            }
        ]
    }
])

