import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from "react-router"
import { createBrowserRouter } from 'react-router'
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

import { Provider } from 'react-redux'
import store from './redux/store.js'

// private routes
import PrivateRoute from './components/PrivateRoute.jsx'

// Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

//admin routes
import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import OrderList from './pages/Admin/OrderList.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

// User routes
import Profile from './pages/User/Profile.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import UserOrders from './pages/User/UserOrders.jsx'


//home
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import Order from './pages/Orders/Order.jsx' 



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App />}>

      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />
      <Route path='/' index={true} element={ <Home /> } />
      
      <Route path='/favorite' element={ <Favorites /> } />
      <Route path='/product/:id' element={ <ProductDetails /> } />

      <Route path='/cart' element={ <Cart /> } /> 
      <Route path='/shop' element={ <Shop />} />
      <Route path='/user-orders' element={ <UserOrders />} />
 
      {/* if logged in then only show it otherwise dont */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element={ <Shipping />} />
        <Route path='/placeorder' element={ <PlaceOrder />} />
        <Route path='/order/:id' element={ <Order />} />
      </Route> 

      {/* admin only routes */}
      <Route path='/admin' element={<AdminRoutes />}>
        <Route path='userlist' element={<UserList />} />
        <Route path='categorylist' element={<CategoryList />} />
        <Route path='productlist' element={<ProductList />} />
        <Route path='orderlist' element={<OrderList />} />
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='allproductslist' element={ <AllProducts /> } />
        <Route path='productlist/:pageNumber' element={<ProductList />} />
        <Route path='product/update/:_id' element={<ProductUpdate />} />
      </Route>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)
