import React from 'react'
import { Navigate } from 'react-router-dom'
import DashboardLayout from 'layouts/DashboardLayout'
import MainLayout from 'layouts/MainLayout'
import AccountView from 'views/account/AccountView'
import CustomerListView from 'views/customer/CustomerListView'
import DashboardView from 'views/reports/DashboardView'
import LoginView from 'views/auth/LoginView'
import NotFoundView from 'views/errors/NotFoundView'
import ProductListView from 'views/product/ProductListView'
import RegisterView from 'views/auth/RegisterView'
import SettingsView from 'views/settings/SettingsView'
import HomePageView from 'views/home/HomePageView'
import MissionView from 'views/home/MissionView'
import ContributeView from 'views/home/ContributeView'
import TermsView from 'views/home/TermsView'
import PrivacyView from 'views/home/PrivacyView'
import ClubListView from 'views/home/ClubListView'
import TeamView from 'views/home/TeamView'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'team', element: <TeamView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'mission', element: <MissionView /> },
      { path: 'privacypolicy', element: <PrivacyView /> },
      { path: 'team', element: <TeamView /> },
      { path: 'termsofservice', element: <TermsView /> },
      { path: 'contribute', element: <ContributeView /> },
      { path: 'clubs', element: <ClubListView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomePageView /> },
      { path: '*', element: <Navigate to='/404' /> }
    ]
  }
]

export default routes
