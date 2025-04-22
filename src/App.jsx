import './App.css';
import {
  createBrowserRouter,
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

// 🔐 Protected Routes
const protectedRoutes = [
  { path: 'code', element: <CodeEditor /> },
  { path: 'bot', element: <Chatbot /> },
  { path: 'CreateFile', element: <CreateFile /> },
  { path: 'ReadFiles', element: <ReadFiles /> },
].map(route => ({
  ...route,
  element: <ProtectedRoute>{route.element}</ProtectedRoute>,
}));

// 🧑‍💻 Guest Routes
const guestRoutes = [
  { path: 'home', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
].map(route => ({
  ...route,
  element: <GuestRoute>{route.element}</GuestRoute>,
}));

// Public + NotFound
const otherRoutes = [
  { path: 'ReadShared', element: <ReadSharedFile /> },
  { path: '*', element: <NotFound /> },
];

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        ...protectedRoutes,
        ...guestRoutes,
        ...otherRoutes,
      ],
    },
  ],
  {
    basename: '/Code-Editor-App',
  }
);

function App() {
  return (
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
