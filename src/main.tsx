import React, { useEffect } from 'react'
import App from './App.tsx'
import './index.css'
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from './pages/Auth/SignInPage.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie';
import TmsPage from './pages/TMS/TmsPage.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorPage from './pages/TMS/ErrorPage.tsx';
import Dashboard from './pages/TMS/Dashboard/Dashboard.tsx';
import Terminals from './pages/TMS/Terminals/Terminals.tsx';
import Operators from './pages/TMS/Operators/Operators.tsx';
import Merchants from './pages/TMS/Merchants/Merchants.tsx';
import AdminSettings from './pages/TMS/AdminSettings/AdminSettings.tsx';
import AvailableTerminals from './pages/TMS/Terminals/AvailableTerminals/AvailableTerminals.tsx';
import CreateTerminal from './pages/TMS/Terminals/CreateTerminal/CreateTerminal.tsx';
import TerminalContextProvider from './context/TerminalsContext/TerminalContext.tsx';
import Transactions from './pages/TMS/Terminals/Transactions/Transactions.tsx';
import AuthContextProvider from './context/AuthContext/AuthContext.tsx';
import CreateOperator from './pages/TMS/Operators/CreateOperator/CreateOperator.tsx';
import OperatorContextProvider from './context/OperatorsContext/OperatorContext.tsx';
import ViewOperator from './pages/TMS/Operators/ViewOperator/ViewOperator.tsx';
import { CreateMerchant } from './pages/TMS/Merchants/CreateMerchant/CreateMerchant.tsx';
import MerchantContextProvider from './context/MerchantContext/MerchantContext.tsx';
import { ViewMerchant } from './pages/TMS/Merchants/ViewMerchant/ViewMerchant.tsx';
import TransactionsContextProvider from './context/TransactionsContext/TransactionsContext.tsx';
import UsersContextProvider from './context/UsersContext/UsersContext.tsx';
import UserManagement from './pages/TMS/UserManagement/UserManagement.tsx';
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signin",
    element: <SignInPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <TmsPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'terminals',
        element: <Terminals />
      },
      {
        path: 'merchants',
        element: <Merchants />
      },
      {
        path: 'operators',
        element: <Operators />,
      },
      {
        path: 'admin',
        element: <AdminSettings />
      },
      {
        path: 'availableTerminals',
        element: <AvailableTerminals />
      },
      {
        path: 'createTerminal',
        element: <CreateTerminal />
      },
      {
        path: 'transactions/:transactionId',
        element: <Transactions />
      },
      {
        path: 'createOperators',
        element: <CreateOperator />
      },
      {
        path: 'operator/details/:operatorId',
        element: <ViewOperator />
      },
      {
        path: 'createMerchant',
        element: <CreateMerchant />
      },
      {
        path: 'merchant/details/:merchantId',
        element: <ViewMerchant />
      },
      {
        path: 'users',   // {
          //   path: 'operator/authorize/:operatorId',
          //   element: <AuthorizeOperator />
          // }
        element: <UserManagement />
      },
      // {
      //   path: 'operator/authorize/:operatorId',
      //   element: <AuthorizeOperator />
      // }
    ],
  }
]);

const queryClient = new QueryClient()

// const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
// const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

// useEffect(() => {
//   const root = window.document.documentElement
//   root.classList.remove("light", "dark")
//   root.classList.add(theme)
// }, [theme])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>

      <AuthContextProvider>
        <CookiesProvider>
          <ChakraProvider>
            <TerminalContextProvider>
              <OperatorContextProvider>
                <MerchantContextProvider>
                  <TransactionsContextProvider>
                    <UsersContextProvider>
                  <RouterProvider router={router} />
                  </UsersContextProvider>
                  </TransactionsContextProvider>
                </MerchantContextProvider>
              </OperatorContextProvider>
            </TerminalContextProvider>
          </ChakraProvider>
        </CookiesProvider>
      </AuthContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,

)