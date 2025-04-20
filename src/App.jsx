import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import CodeEditor from './Pages/CodeEditor/CodeEditor';
import Layout from './Components/Layout/Layout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import UserProvider from './Contexts/UserContext/User.context';
import CreateFile from './Pages/CreateFile/CreateFile';
import ReadFiles from './Pages/ReadFiles/ReadFiles';
import ReadSharedFile from './Pages/ReadSharedFile/ReadSharedFile';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import GuestRoute from './Components/GuestRoute/GuestRoute';
import NotFound from './Components/NotFound/NotFound';
import Home from './Pages/Home/Home';

function App() {
  const router = createBrowserRouter(
    [
      // 🔁 Default redirect to /home
      {
        path: '/',
        element: <Navigate to="/home" />,
      },

      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'code', element: <CodeEditor /> },
          { path: 'CreateFile', element: <CreateFile /> },
          { path: 'ReadFiles', element: <ReadFiles /> },
        ],
      },
      {
        path: '/',
        element: (
          <GuestRoute>
            <Layout />
          </GuestRoute>
        ),
        children: [
          { path: 'home', element: <Home /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: '*', element: <NotFound /> },
        ],
      },
      {
        path: '/',
        element: <Layout />,
        children: [{ path: 'ReadShared', element: <ReadSharedFile /> }],
      },
    ],
    {
      basename: '/Code-Editor-App', // If deployed in subdirectory
    }
  );

  return (
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
