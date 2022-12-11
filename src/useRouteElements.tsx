import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { AppContext } from './contexts/app.context'
import CartLayout from './layouts/CartLayout'
import MainLayOut from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetail from './pages/Login/ProductDetail'
import PageNotFound from './pages/PageNotFound'
import ProductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ChangePassword from './pages/User/ChangePassword'
import HistoryPurchase from './pages/User/HistoryPurchase'
import UserLayout from './pages/User/layouts/UserLayout'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayOut>
              <UserLayout />
            </MainLayOut>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayOut>
          <ProductDetail />
        </MainLayOut>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayOut>
          <ProductList />
        </MainLayOut>
      )
    },
    {
      path: '*',
      element: (
        <MainLayOut>
          <PageNotFound />
        </MainLayOut>
      )
    }
  ])
  return routeElements
}
