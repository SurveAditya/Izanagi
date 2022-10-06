import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from 'react-bootstrap/Container';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CartScreen from "./screens/CartScreen";
const  App = () => {
  return (
    <BrowserRouter>
   
        <Header />
        <main className="py-3">
         <Container>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/product/:id"  element={<ProductScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/"  element={<HomeScreen />} exact />
        </Routes>
         </Container>
          
          

        </main>
        <Footer />
           
    </BrowserRouter>
  );
}

export default App;
