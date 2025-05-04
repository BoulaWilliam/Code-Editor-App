import './App.css';
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

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
import Chatbot from './Pages/Chatbot/Chatbot';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';

// ✅ Use HashRouter instead of BrowserRouter for GitHub Pages
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      // 🔐 Protected Routes
      {
        path: 'code/:fileId',
        element: (
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: 'code',
        element: (
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bot',
        element: (
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        ),
      },
      {
        path: 'CreateFile',
        element: (
          <ProtectedRoute>
            <CreateFile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ReadFiles',
        element: (
          <ProtectedRoute>
            <ReadFiles />
          </ProtectedRoute>
        ),
      },

      // 🧑‍💻 Home Route (accessible to all)
      {
        path: 'home',
        element: <Home />,
      },

      // 🧑‍💻 Guest Routes
      {
        path: 'login',
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: 'forgetPassword',
        element: (
          <GuestRoute>
            <ForgetPassword />
          </GuestRoute>
        ),
      },
      {
        path: 'resetPassword',
        element: (
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        ),
      },

      // 📁 Public Route
      { path: 'ReadShared', element: <ReadSharedFile /> },

      // ❌ Not Found
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
