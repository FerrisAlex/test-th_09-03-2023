import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Trash, Pencil } from 'react-bootstrap-icons';

import { getAllDataSucursal, getDeptoById, getMuniById } from "../../data";
import CustomModal from "../../components/Modal";
import SucursalForm from "./addSucursalForm";

const Sucursales = () => {
  const [state, setState] = useState({
    data: [],
    isEdit: false,
    isDelete: false,
    modalTitle: 'Agregar Sucursal',
    modalBody: null,
    modalFooter: null,
  });

  const [showModal, setShowModal] = useState(false);

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

  const deleteSucursal = async(id) => {
    const body = {
      idSucursal: id
    }
    const data = await fetch(
      "http://localhost:3001/deleteSucursal",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      if(dataResponse.status === 1) {
        handleShowModal(false);
      }
      alert(dataResponse.mensaje);
    });
  }

  const handleShowModal = (show) => {
    setShowModal(show);
    if(!show) {
      getData();
    }
  }

  const onAddItem = () => {
    setState({
      ...state,
      isEdit: false,
      modalTitle: "Agregar Sucursal",
      modalBody: (
        <SucursalForm onHide={() => handleShowModal(false)} isEdit={false} />
      ),
      modalFooter: null,
    });

    handleShowModal(true);
  }

  const onEditItem = (item) => {
    setState({
      ...state,
      isEdit: true,
      modalTitle: "Editar Sucursal",
      modalBody: (
        <SucursalForm onHide={() => handleShowModal(false)} isEdit={true} item={item} />
      ),
      modalFooter: null,
    });

    handleShowModal(true);
  }

  const onDeleteItem = (item) => {
    setState({
      ...state,
      isDelete: true,
      modalTitle: "Eliminar Sucursal",
      modalBody: (
        <div>
          <p>¿Estás seguro que deseas eliminar este dato?</p>{" "}
          <p><span>ID:</span>{` ${item.id}`}</p>
          <p>{`${item.direccion}, ${item.departamento}, ${item.municipio}`}</p>
        </div>
      ),
      modalFooter: (
        <>
          <Button variant="danger" onClick={() => deleteSucursal(item.id)}>
            Eliminar
          </Button>
          <Button variant="primary" onClick={() => handleShowModal(false)}>
            Cancelar
          </Button>
        </>
      ),
    });
    handleShowModal(true);
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
                  <Button onClick={() => onAddItem()} variant="primary">Agregar +</Button>
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
                <th>Controls</th>
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
                    <td>
                    <Button variant="primary" onClick={() => onEditItem(item)}><Pencil color="white" size={12} /></Button>{' '}
                    <Button variant="danger" onClick={() => onDeleteItem(item)}><Trash color="white" size={12} /></Button>{' '}
                    </td>
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
        show={showModal}
        onHide={() => handleShowModal(false)}
        title={state.modalTitle}
        body={state.modalBody}
        footer={state.modalFooter}
      />
    </div>
  );
};

export default Sucursales;
