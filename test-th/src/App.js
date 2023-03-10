import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { getAllDataCategoriaProducto } from './data';
import Sucursales from './pages/Sucursales';

function App() {
  return (
    <div className="App">
      <Sucursales/>
    </div>
  );
}

export default App;
