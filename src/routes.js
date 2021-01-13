import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import FarmerListView from 'src/views/farmer/FarmerListView';
import SellerListView from 'src/views/seller/SellerListView';
import BuyerListView from 'src/views/buyer/BuyerListView';
import FarmListView from 'src/views/farm/FarmListView';
import CounsultancyListView from 'src/views/consultancy/CounsultancyListView';
import CaseListView from 'src/views/cases/CaseListView';
import UserAuthenticationListView from 'src/views/userAuthentication/UserAuthenticationListView';
import AdvisorListView from 'src/views/Advisor/AdvisorListView';
import CropListView from 'src/views/Crop/CropListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'farmers', element: <FarmerListView /> },
      { path: 'seller', element: <SellerListView /> },
      { path: 'buyer', element: <BuyerListView /> },
      { path: 'consultancy', element: <CounsultancyListView /> },
      { path: 'userAuthentication', element: <UserAuthenticationListView /> },
      { path: 'cases', element: <CaseListView /> },
      { path: 'Crop', element: <CropListView /> },
      { path: 'farm', element: <FarmListView /> },
      { path: 'Advisor', element: <AdvisorListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
