import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { Trash, Pencil } from 'react-bootstrap-icons';
import AddCategoriaForm from "./addCategoriaForm";
import CustomModal from "../../components/Modal";

const CategoriaProducto = () => {

  const [state, setState] = useState({
    data: [],
    modalTitle: '',
    modalBody: null,
    modalFooter: null,
  });

  const [showModal, setShowModal] = useState(false);

  const getData = async() => {
    await fetch(
      'http://localhost:3001/getCategoria',
      {
        method: 'GET'
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      setState({...state, data: dataResponse.data});
    });
  }

  const deleteCategoria = async(id) => {
    const body = {
      idCategoria: id
    }
    const data = await fetch(
      "http://localhost:3001/deleteCategoria",
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
      modalTitle: "Agregar Categoria",
      modalBody: (
        <AddCategoriaForm onHide={() => handleShowModal(false)} isEdit={false} />
      ),
      modalFooter: null,
    });

    handleShowModal(true);
  }

  const onEditItem = (item) => {
    setState({
      ...state,
      isEdit: true,
      modalTitle: "Editar Categoria",
      modalBody: (
        <AddCategoriaForm onHide={() => handleShowModal(false)} isEdit={true} item={item} />
      ),
      modalFooter: null,
    });

    handleShowModal(true);
  }

  const onDeleteItem = (item) => {
    setState({
      ...state,
      isDelete: true,
      modalTitle: "Eliminar Categoria",
      modalBody: (
        <div>
          <p>¿Estás seguro que deseas eliminar este dato?</p>{" "}
          <p><span>ID:</span>{` ${item.id}`}</p>
          <p>{`${item.categoria}, ${item.descripcion}`}</p>
        </div>
      ),
      modalFooter: (
        <>
          <Button variant="danger" onClick={() => deleteCategoria(item.id)}>
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
    <div className="categoria-container">
      <div className="categoria-header">
        <div className="categoria-header__title">
          <Container fluid>
            <h1 className="title">Categoria de Producto</h1>
          </Container>
        </div>

        <div className="categoria-panel">
          <Container>
            <Row>
              <Col lg className="categoria-panel__controls">
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
              <Col lg className="categoria-panel__buttons">
                <div className="categoria-panel__add">
                  <Button onClick={() => onAddItem()} variant="primary">
                    Agregar +
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {state.data && state.data.length > 0 ? (
        <div className="categoria-data">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((item) => {
                return (
                  <tr key={item.id + item.descripcion}>
                    <td>{item.id}</td>
                    <td>{item.categoria}</td>
                    <td>{item.descripcion}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => onEditItem(item)}
                      >
                        <Pencil color="white" size={12} />
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => onDeleteItem(item)}
                      >
                        <Trash color="white" size={12} />
                      </Button>{" "}
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
}

export default CategoriaProducto;