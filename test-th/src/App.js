import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { getAllDataCategoriaProducto } from './data';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Sucursales from './pages/Sucursales';
import CategoriaProducto from './pages/CategoriaProducto';
import CustomNavbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sucursales/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/categoria-producto",
      element: <CategoriaProducto/>,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="App">
      <CustomNavbar/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
