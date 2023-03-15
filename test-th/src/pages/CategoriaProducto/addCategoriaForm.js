import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddCategoriaForm = (props) => {

  const [state, setState] = useState({
    categoriaIdSelected: null,
    descripcion: '',
  });
  
  const [categorias, setCategorias] = useState([]);
  
  const getDataCategorias = async() => {
    const data = await fetch(
      "http://localhost:3001/getCategorias",
      {
        method: "GET",
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      setCategorias(dataResponse.data);
    });
  }

  const getDataOnEdit = () => {
    if (props.isEdit && props.item) {
      const { item } = props;
      const {
        categoria_id,
        descripcion
      } = item;

      setState({
        ...state,
        categoriaIdSelected: categoria_id,
        descripcion: descripcion,
      });
    }
  }

  const submitForm = async() => {
    if (state.categoriaIdSelected && state.descripcion) {
      const body = {
        categoria: state.categoriaIdSelected,
        descripcion: state.descripcion,
      };

      if (props.isEdit) {
        body.idCategoria = props.item.id;
      }

      const url = props.isEdit
        ? `http://localhost:3001/updateCategoria`
        : `http://localhost:3001/addCategoria`;

      const method = props.isEdit
        ? "PUT"
        : "POST";

      await fetch(
        url,
        {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      ).then(res => {
        return res.json();
      }).then(dataResponse => {
        if(dataResponse.status === 1) {
          props.onHide();
        }
        alert(dataResponse.mensaje);
      });
    } else {
      alert('Error al intentar agregar Categoria, completar campos');
    }
  }

  const changeCategoria = (id) => {

  }

  const changeStateText = (value, stateValue) => {
    setState({...state, [stateValue]: value});
  }

  useEffect(() => {
    getDataCategorias();
    getDataOnEdit()
  }, []);

  return(
    <Form>
      <Form.Group className="mb-3" controlId="formBasicCategoria">
        <Form.Label>Categoria</Form.Label>
        <Form.Select 
          aria-label="Default select example"
          onChange={(e) => {changeStateText(e.target.value, 'categoriaIdSelected');}}
          disabled={categorias.length === 0}
          value={state.categoriaIdSelected}
        >
          <option>Categoria</option>
          {categorias.map(item => {
            return(
              <option key={item.id + item.nombre} value={item.id}>{item.nombre}</option> 
            )
          })}        
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDesc">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control type="text" placeholder="Ingresar descripcion" value={state.descripcion} onChange={(e) => changeStateText(e.target.value, 'descripcion')}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
      <Button variant="primary" onClick={submitForm}>
        Submit
      </Button>
    </Form>
  );
}

export default AddCategoriaForm;