import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import HomePage from './pages/HomePage/HomePage.jsx'
import AuthPage from './pages/AuthPage/AuthPage.jsx'
import NotFound from './components/common/NotFound.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
const styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.100', '#000')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
    },
  }),
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, styles })

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/auth', element: <AuthPage /> },
      { path: '/:username', element: <ProfilePage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
