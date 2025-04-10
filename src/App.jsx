import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        // {You Must Be Authorized To Access These Pages}
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <CodeEditor /> },
        { path: 'code', element: <CodeEditor /> },
        { path: 'CreateFile', element: <CreateFile /> },
        { path: 'ReadFiles', element: <ReadFiles /> },
      ],
    },

    {
      path: '/',
      element: (
        // {You Don't Have to Be Authorized To Access These Pages}
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ],
    },

    // Make ReadSharedFile accessible to both protected and guest routes
    {path:'/',element:<Layout/>,children:
      [
    { path: 'ReadShared', element: <ReadSharedFile /> },

      ]}
  ]);

  return (
    <>
      <UserProvider>
        <Toaster />
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
