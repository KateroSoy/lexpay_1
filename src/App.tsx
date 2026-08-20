/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";
import Account from "./pages/Account";
import Business from "./pages/Business";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="products" element={<Explore />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="services" element={<Explore />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="digital" element={<Explore />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders/success" element={<OrderSuccess />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderTracking />} />
          <Route path="account" element={<Account />} />
          <Route path="business" element={<Business />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
