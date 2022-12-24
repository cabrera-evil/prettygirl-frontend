import React, { useState, useEffect, useContext } from 'react'
import Form from '../../Form/Form';
import ProductCardBooking from '../ProductCardBooking/ProductCardBooking';
import Loading from '../../Loading/Loading';
import './SecondStep.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SecondStep = ({ onLoad }) => {
  const [Products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);
  const [total, setTotal] = useState(0);
  const [descriptionFields, setDescriptionFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [envio, setEnvio] = useState(false);
  const [Listo, setListo] = useState(false);
  const [Guardando, setGuardando] = useState(false);
  const [SubTotal, setSubTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (SubTotal > 0) {
      setTotal(SubTotal);
      console.log('Hola')
    }
  }, [SubTotal])

  useEffect(() => {
    if (!localStorage.getItem("products")) navigate('/feed')
  }, [localStorage.getItem("products")])

  useEffect(() => {
    setLoading(true)
    onLoad(2);
    if (total > 0) {
      const Fields = [{
        'key': '1',
        'element': 'label',
        'text': 'Descripción de reserva',
        'use': false,
        'clase': 'title-description'
      },
      {
        'key': '2',
        'element': 'react',
        'clase': 'cards',
        'text': Products.map((item, index) => {
          if (index > 0) {
            return (
              <ProductCardBooking key={index} item={item} id={'reserva'} />
            )
          }
        }),
      }, {
        'key': '3',
        'element': 'label',
        'text': 'Total a pagar: $' + total,
        'use': false,
        'clase': 'total'
      }, {
        'key': '4',
        'element': 'hr',
        'clase': 'line'
      },
      {
        'key': '5',
        'element': 'label',
        'text': 'Escoge tu método de envío preferido',
        'use': false,
        'clase': 'delivery'
      }, {
        'key': '6',
        'element': 'label',
        'clase': 'Second-envio',
        'type': 'checkbox',
        'text': 'Recoger en el local',
        'setValue': setEnvio,
      },
      ]
      setDescriptionFields(Fields);
    }

  }, [total]);

  useEffect(() => {
    if (Products.length > 0) {
      let total = 0;
      Products.map((item, index) => {
        if (index > 0) {
          total += item.price * item.amount;
        }
      })
      console.log(total);
      setSubTotal(total);
    }
  }, [Products]);

  useEffect(() => {
    if (descriptionFields.length > 0) {
      setLoading(false)
    }
  }, [descriptionFields])

  /* Los campos del objeto deben de ser obtenidos de la api */

  function Confirmation() {
    if (envio && !Guardando) {
      setGuardando(true);
      let data = {
        description: {
          products: Products.map((item, index) => {
            if (index > 0) {
              return ({
                name: item.name,
                size: item.size,
                color: item.color,
                amount: item.amount
              })
            }
          })
        },
        user: Products[0].user,
        address: 'Recoger en local',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.description.products.splice(0, 1);
      let url = '/api/bookings';
      const config = {
        headers: {
          'x-token': localStorage.getItem("token")
        }
      };
      axios.post(url, data, config).then((res) => {
        if (res.status === 200) {
          url = "/api/bags/" + Products[0].bag;
          axios.delete(url, config).then((res) => {
            if (res.status === 200) {
              localStorage.removeItem("products");
              localStorage.setItem("confimation", JSON.stringify(Products));
              navigate('/feed/booking/confirmation');
            }
          })
        }
      })
      setGuardando(false)
    }
  }

  return (
    <>
      {loading ?
        <Loading /> :
        <Form title={'Método de envío y reserva'} formType={'description'} formFields={descriptionFields} justContinue={false} cancelPath={'../client-data'} cancelText={'Volver'} continuePath={'../confirmation'} continueHandle={() => { Confirmation() }} Activo={Listo} continueText={'Continuar'} />}
    </>
  )
}

export default SecondStep