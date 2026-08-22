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
import { AdminLayout, RequireAdmin } from "./pages/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { Dashboard } from "./pages/admin/Dashboard";
import { ResourceList } from "./pages/admin/ResourceList";
import { ResourceForm } from "./pages/admin/ResourceForm";
import { NotFoundPanel } from "./pages/admin/NotFoundPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront */}
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

        {/* Demo CMS — rendered outside the storefront chrome */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path=":resource" element={<ResourceList />} />
          <Route path=":resource/:id" element={<ResourceForm />} />
          <Route path="*" element={<NotFoundPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
