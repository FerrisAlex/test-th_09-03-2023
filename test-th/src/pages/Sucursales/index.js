import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllDataSucursal, getDeptoById, getMuniById } from "../../data";

const Sucursales = () => {
  const [state, setState] = useState({
    data: [],
  });

  const getData = async () => {
    //const data = await getAllDataSucursal();
    const data = await fetch(
      "http://localhost:3001/getSucursales",
      {
        method: "GET",
      }
    );
    console.log(data, "DATA ------------")
    setState({...state, data: data});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="sucursal-container">
      <div className="sucrusal-header">
        <div className="sucursal-header__title">
          <h1 className="title">
            Sucursales
          </h1>
        </div>
      </div>

      {state.data && state.data.length > 0 ? (
        <div className="sucrusal-data">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Departamento</th>
                <th>Municipio</th>
                <th>Telegono</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map(item => {
                const deptoName = getDeptoById(item.departamento);
                const muniName = getMuniById(item.municipio);

                return (
                  <tr 
                    key={item.id+item.direccion}
                  >
                    <td>{item.id}</td>
                    <td>{item.direccion}</td>
                    <td>{item.correo}</td>
                    <td>{deptoName.nombre}</td>
                    <td>{muniName.nombre}</td>
                    <td>{item.telefono}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="empty-data">No hay datos para mostrar...</div>
      )}
    </div>
  );
};

export default Sucursales;
