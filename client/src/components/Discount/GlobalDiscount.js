import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { connect, useDispatch, useSelector } from "react-redux";

import './globalDiscount.scss'
import { addDiscount, editDiscount, getDiscount } from '../../actions/discountsActions';
import Moment from 'moment';


export default function GlobalDiscount() {


  const dispatch = useDispatch()
  const descuentos = useSelector((store) => store.auth.discounts);
  // ESTADOS
  const [input, setInput] = useState({
    monto: "",
    porcentaje: "",
    duracion: "",
    estado: ""
  })

  const [dataDescuento, setDataDescuento] = useState()
  //nuevo descuento
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  //borrar descuento
  const [modal3, setModal3] = useState(false);
  const toggle3 = () => setModal3(!modal3);

  useEffect(() => { dispatch(getDiscount()) }, [])


  // useEffect(() => {

  //   dispatch(getDiscount())

  // }, [input])

  //funcion de estado inputs
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  const handleOpenModal = () => {
    // console.log(productId)
    setDataDescuento()
    toggle()
  }
  // add descuento
  const handleAdd = async (data) => {
    // console.log("entra al handle add", data)
    await dispatch(addDiscount(data.monto, data.porcentaje, data.duracion, data.estado))
    await dispatch(getDiscount())

    toggle();
  }

  const handleEdit = async (id, estado) => {
    // console.log(id,estado)
    await dispatch(editDiscount(id, estado))
    await dispatch(getDiscount())
  }

  function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY')
  }

  return (

    <Container >
      <h1 className="tituloGlobal">Descuentos</h1>
      <br />
      <button className="buttonFormAdd" onClick={toggle}> Agregar Descuento</button>
      <div className={"table-responsive " + "containerDiscout"}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Monto</th>
              <th>Porcentaje</th>
              <th>Fecha de creación</th>
              <th>Duración (días)</th>
              <th>Estado</th>

            </tr>
          </thead>
          <tbody>
            {descuentos && descuentos.map(((descuento, index) => (
              <tr key={descuento.id}>

                <td>{descuento.id}</td>
                <td>{descuento.mount}</td>
                <td>{descuento.percentage}</td>
                <td>{formatDate(descuento.createdAt)}</td>
                <td>{descuento.days}</td>
                <td>
                  <input checked={descuento.isActive === true ? true : false} onChange={(e) => handleEdit(descuento.id, e.target.checked)} class="form-check-input" type="checkbox" value={descuento.estado} id="flexCheckIndeterminate" />
                </td>

              </tr>
            )))}

          </tbody>
        </Table>

        {/* -------------MODAL POST--------------- */}
        <div>
          <Modal isOpen={modal} toggle={toggle} >
            <Form onSubmit={e => e.preventDefault()}>
              <ModalHeader toggle={toggle}>Nuevo Descuento</ModalHeader>
              <ModalBody>

                <FormGroup>
                  <Label for="monto"> Monto</Label>
                  <Input type="number" name="monto" id='monto' value={input.monto} onChange={handleInputChange} />

                </FormGroup>

                <FormGroup>
                  <Label for="porcentaje"> Porcentaje</Label>
                  <Input type="number" name="porcentaje" id='porcentaje' value={input.porcentaje} onChange={handleInputChange} />

                </FormGroup>
                <FormGroup>
                  <Label for="duracion"> Duración (dias)</Label>
                  <Input type="number" name="duracion" id='duracion' value={input.duracion} onChange={handleInputChange} />

                </FormGroup>
                <FormGroup>
                  <Label for="estado"> Estado</Label>
                  <select class="form-select" aria-label="Default select example" name="estado" id="estado" rows="1" value={input.estado} onChange={handleInputChange}>
                    <option value="false">Inactivo</option>
                    <option value="true">Activo</option>
                  </select>
                </FormGroup>


              </ModalBody>
              <ModalFooter>

                <button className="buttonForm" onClick={() => handleAdd({ monto: input.monto, porcentaje: input.porcentaje, duracion: input.duracion, estado: input.estado })} type="submit" >Crear Descuento</button>

                <button className="buttonForm" onClick={toggle}>Salir</button>

              </ModalFooter>
            </Form>
          </Modal>
        </div>
      </div>

    </Container>
  );

}
