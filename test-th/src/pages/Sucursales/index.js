import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { getAllDataSucursal, getDeptoById, getMuniById } from "../../data";
import CustomModal from "../../components/Modal";
import SucursalForm from "./addSucursalForm";

const Sucursales = () => {
  const [state, setState] = useState({
    data: [],
    showModal: false,
  });

  const getData = async () => {
    //const data = await getAllDataSucursal();
    const data = await fetch(
      "http://localhost:3001/getSucursales",
      {
        method: "GET",
      }
    );
    const jsonParsed = await data.json();
    setState({...state, data: jsonParsed.data});
  };

  const handleShowModal = (show) => {
    setState({...state, showModal: show});
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="sucursal-container">
      <div className="sucrusal-header">
        <div className="sucursal-header__title">
          <Container fluid>
            <h1 className="title">Sucursales</h1>
          </Container>
        </div>

        <div className="sucursal-panel">
          <Container>
            <Row>
              <Col lg className="sucursal-panel__controls">
                <div className="controls-search">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </div>
              </Col>
              <Col lg className="sucursal-panel__buttons">
                <div className="sucursal-panel__add">
                  <Button onClick={() => handleShowModal(true)} variant="primary">Agregar +</Button>
                </div>
              </Col>
            </Row>
          </Container>
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
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((item) => {
                return (
                  <tr key={item.id + item.direccion}>
                    <td>{item.id}</td>
                    <td>{item.direccion}</td>
                    <td>{item.correo}</td>
                    <td>{item.departamento}</td>
                    <td>{item.municipio}</td>
                    <td>{item.telefono}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="empty-data">No hay datos para mostrar...</div>
      )}

      <CustomModal
        show={state.showModal}
        onHide={() => handleShowModal(false)}
        title="Agregar sucursal"
        form={<SucursalForm/>}
      />
    </div>
  );
};

export default Sucursales;
