import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layoutes/RootLayout'
import ProfileLayout from '../layoutes/ProfileLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import NotFound from '../pages/NotFound'
import Products from '../pages/Products'
import Home from '../pages/Home'
import ProductDetails from '../components/ProductDetails'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Checkout from '../pages/Checkout'
import Orders from '../pages/Orders'
import Wishlist from '../pages/WishList'
import Compare from '../pages/compare'

// Admin imports
import AdminLayout from '../admin/AdminLayout'
import Dashboard from '../pages/Dashboard'
import AddProduct from '../pages/AddProduct'
import ManageProducts from '../pages/ManageProducts'
import EditProduct from '../pages/EditProduct'

export const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        errorElement:<NotFound/>,
        children:[
            {
                index: true,
                element:<Home/>
            },
            {
                path:"/products",
                element:<Products/>
            }, 
             {
                path:"/products/:id",
                element:<ProductDetails/>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
             {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <Signup />,
      },
        ]
    },

    // protected customer area
    {
        element:<ProtectedRoute allowedRoles={["user"]}/>,
       children:[
        {
           path:"profile",
           element:<ProfileLayout/>,
           children:[
            {
                index:true,
                element:<Profile/>
            },
            {
                  path: "cart",
                  element: <Cart />,
            },
            {
                path:"checkout",
                element:<Checkout/>
            },
            {
                path:"orders",
                element:<Orders/>,
            },
            {
               path: "wishlist",
               element: <Wishlist />,
             },
             {
                  path: "compare",
                   element: <Compare />,
             },
           ]

        }
       ]
    },


    // admin protected area
    {
        path:"admin",
        element:<ProtectedRoute allowedRoles={["admin"]} />,
        children :[
          {
            element:<AdminLayout/>,
            children:[
               {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "products",
          element: <ManageProducts />,
        },
        {
          path: "edit-product/:id",
          element: <EditProduct />,
        },
            ]
          }
        ]
    }

])

