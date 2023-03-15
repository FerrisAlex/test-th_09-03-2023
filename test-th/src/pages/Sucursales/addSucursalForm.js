import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SucursalForm = (props) => {

  const [state, setState] = useState({
    departamentoData: [],
    municipioData: [],
    departamentoIdSelected: null,
    municipioIdSelected: null,
    direccion: '',
    correo: '',
    telefono: '',
    isEdit: false,
  });

  const [deptos, setDeptos] = useState([]);
  const [muni, setMuni] = useState([]);

  const getDataDepartamentos = async() => {
    const data = await fetch(
      "http://localhost:3001/getDepartamentos",
      {
        method: "GET",
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      setDeptos(dataResponse.data);
    });
  }

  const getDataMunicipios = async(id) => {
    await fetch(
      `http://localhost:3001/getMunicipios${id? '?id=' + id : ''}`,
      {
        method: "GET",
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      //setState({...state, municipioData: dataResponse.data});
      setMuni(dataResponse.data);
    });
  }

  const getDataOnEdit = () => {
    if (props.isEdit && props.item) {
      const { item } = props;
      const {
        direccion,
        correo,
        departamento,
        departamento_id,
        municipio,
        municipio_id,
        telefono,
      } = item;

      setState({
        ...state,
        direccion: direccion,
        correo: correo,
        departamentoIdSelected: departamento_id,
        municipioIdSelected: municipio_id,
        telefono: telefono
      });

      getDataMunicipios(departamento_id);
    }
  }

  const changeDepto = (id) => {
    setState({...state, departamentoIdSelected: id, municipioIdSelected: null});
    getDataMunicipios(id);
  }

  const changeMuni = (id) => {
    setState({...state, municipioIdSelected: id});
  }

  const changeStateText = (value, val) => {
    setState({...state, [val]: value});
  }

  const submitForm = async() => {
    if (state.correo && state.direccion && state.departamentoIdSelected && state.municipioIdSelected && state.telefono) {
      const body = {
        direccion: state.direccion,
        correo: state.correo,
        departamento: state.departamentoIdSelected,
        municipio: state.municipioIdSelected,
        telefono: state.telefono,
      };

      if (props.isEdit) {
        body.idSucursal = props.item.id;
      }

      const url = props.isEdit
        ? `http://localhost:3001/updateSucursal`
        : `http://localhost:3001/addSucursal`;

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
      alert('Error al intentar agregar Sucursal');
    }
  }

  useEffect(() => {
    getDataDepartamentos();
    getDataOnEdit()
  }, []);

  return(
    <Form>
      <Form.Group className="mb-3" controlId="formBasicDireccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control type="text" placeholder="Ingresar direccion" value={state.direccion} onChange={(e) => changeStateText(e.target.value, 'direccion')}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Ingresar correo" value={state.correo} onChange={(e) => changeStateText(e.target.value, 'correo')}/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDepto">
        <Form.Label>Departamento</Form.Label>
        <Form.Select 
          aria-label="Default select example"
          onChange={(e) => {changeDepto(e.target.value);}}
          disabled={deptos.length === 0}
          value={state.departamentoIdSelected}
        >
          <option>Departamento</option>
          {deptos.map(item => {
            return(
              <option key={item.id + item.nombre} value={item.id}>{item.nombre}</option> 
            )
          })}        
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMuni">
        <Form.Label>Municipio</Form.Label>
        <Form.Select 
          disabled={!state.departamentoIdSelected} 
          onChange={(e) => changeMuni(e.target.value)} 
          aria-label="Default select example"
          value={state.municipioIdSelected}
        >
          <option value={null}>Municipio</option>
          {muni.map(item => {
            return(
              <option key={item.id + item.nombre} value={item.id}>{item.nombre}</option> 
            )
          })}        
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTelefono">
        <Form.Label>Telefono</Form.Label>
        <Form.Control type="number" placeholder="Ingresar telefono" value={state.telefono} onChange={(e) => changeStateText(e.target.value, 'telefono')}/>
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

export default SucursalForm;