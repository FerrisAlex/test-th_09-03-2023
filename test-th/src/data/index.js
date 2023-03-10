const categoriaProductoData = [
  {
    id: 0,
    categoriaId: 0,
    descripcion: 'Microondas color negro de 19 pulgadas',
  },
];

const sucursalData = [
  {
    id: 0,
    direccion: '16 Av. 7-11 Zona 5, Ciudad de Guatemala',
    correo: 'sucursal1@gmail.com',
    departamento: 0,
    municipio: 0,
    telefono: '+502 55213638',
  },
  {
    id: 1,
    direccion: '1 Av. 18-1 Zona 14, Cobán',
    correo: 'sucursal2@gmail.com',
    departamento: 1,
    municipio: 2,
    telefono: '+502 22154485',
  },
];

const categoriaData = [
  {
    id: 0,
    nombre: 'Electrodoméstico',
  },
];

const departamentoData = [
  {
    id: 0,
    nombre: 'Guatemala',
  },
  {
    id: 1,
    nombre: 'Alta Verapaz',
  },
];

const municipioData = [
  {
    id: 0,
    deptoId: 0,
    nombre: 'Guatemala',
  },
  {
    id: 1,
    deptoId: 0,
    nombre: 'Mixco',
  },
  {
    id: 2,
    deptoId: 1,
    nombre: 'Cobán',
  },
];

const getAllDataCategoriaProducto = () => {
  return categoriaProductoData;
}

const getAllDataSucursal = () => {
  return sucursalData;
}

const getAllDataCategoria = () => {
  return categoriaData;
}

const getAllDataDepto = () => {
  return departamentoData;
}

const getCatProdById = (id) => {
  return categoriaProductoData.find(item => item.id === id);
}

const getSucursalById = (dataName, id) => {
  return categoriaProductoData.find(item => item.id === id);
}

const getCategoriaById = (id) => {
  return categoriaProductoData.find(item => item.id === id);
}

const getDeptoById = (id) => {
  return departamentoData.find(item => item.id === id);
}

const getMuniById = (id) => {
  return municipioData.find(item => item.id === id);
}

const getMunicipiosByDepto = (id) => {
  return municipioData.filter(item => item.deptoId === id);
}

export {
  categoriaProductoData,
  sucursalData,
  categoriaData,
  departamentoData,
  municipioData,
  getAllDataCategoriaProducto,
  getAllDataSucursal,
  getAllDataCategoria,
  getAllDataDepto,
  getCatProdById,
  getSucursalById,
  getCategoriaById,
  getDeptoById,
  getMuniById,
  getMunicipiosByDepto,
};