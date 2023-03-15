import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SucursalForm = () => {

  const [state, setState] = useState({
    departamentoData: [],
    municipioData: [],
    departamentoIdSelected: null,
    municipioIdSelected: null,
    direccion: '',
    correo: '',
    telefono: '',
  });

  const getDataDepartamentos = async() => {
    const data = await fetch(
      "http://localhost:3001/getDepartamentos",
      {
        method: "GET",
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      setState({...state, departamentoData: dataResponse.data});
    });
    //const dataParsed = await data.json();
    //console.log(dataParsed, "DATA PARSED DEPTOS ---------")
  }

  const getDataMunicipios = async(id) => {
    await fetch(
      `http://localhost:3001/getMunicipios?id=${id}`,
      {
        method: "GET",
      }
    ).then(res => {
      return res.json();
    }).then(dataResponse => {
      setState({...state, municipioData: dataResponse.data});
    });
  }

  const changeDepto = (id) => {
    console.log(id)
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
    console.log(state)
    if (state.correo && state.direccion && state.departamentoIdSelected && state.telefono) {
      const body = {
        direccion: state.direccion,
        correo: state.correo,
        departamento: state.departamentoIdSelected,
        municipio: 1,
        telefono: state.telefono,
      };

      await fetch(
        `http://localhost:3001/addSucursal`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }
      ).then(res => {
        return res.json();
      }).then(dataResponse => {
        alert(dataResponse.mensaje);
      });
    } else {
      alert('Error al intentar agregar Sucursal');
    }
  }

  useEffect(() => {
    getDataDepartamentos();
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
        <Form.Select onChange={(e) => setState({...state, departamentoIdSelected: e.target.value})} aria-label="Default select example">
          <option>Departamento</option>
          {state.departamentoData.map(item => {
            return(
              <option key={item.id + item.nombre} value={item.id}>{item.nombre}</option> 
            )
          })}        
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMuni">
        <Form.Label>Municipio</Form.Label>
        <Form.Select disabled={!state.departamentoIdSelected} onChange={(e) => setState({...state, municipioIdSelected: e.target.value})} aria-label="Default select example">
          <option value={null}>Municipio</option>
          {state.municipioData.map(item => {
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