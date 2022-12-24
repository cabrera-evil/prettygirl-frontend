import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../Form/Form';
import Loading from '../../Loading/Loading'
import './ThirdStep.scss'

const ThirdStep = ({ onLoad }) => {
  /* El objeto product y delivery serán obetenidos desde la api */
  const [product, setProduct] = useState(localStorage.getItem("confimation") ? JSON.parse(localStorage.getItem("confimation")) : []);
  const [descriptionFields, setdescriptionFields] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("confimation") ? true : navigate('../../../feed');
    onLoad(3);
  }, [])

  useEffect(() => {
    setdescriptionFields([
      {
        'key': '1',
        'element': 'label',
        'text': '¡Tu reserva se ha registrado correctamente!',
        'use': false,
        'clase': 'information-message'
      },
      {
        'key': '2',
        'element': 'react',
        'clase': 'receipt',
        'text': <>
          <table key='1'>
            <thead key='2'>
              <tr key='3'>
                <td>Producto</td>
                <td>Color</td>
                <td>Talla</td>
                <td>Cantidad</td>
                <td>Precio c/u</td>
                <td>Sub total</td>
              </tr>
            </thead>
            <tbody>
              {
                product.map((data, index) => {
                  console.log(data)
                  if (index > 0) {
                    return <tr key={index + 3}>
                      <td>{data.name}</td>
                      <td>{data.color}</td>
                      <td>{data.size}</td>
                      <td>{data.amount}</td>
                      <td>${data.price}</td>
                      <td>${data.price * data.amount}</td>
                    </tr>
                  }
                })
              }
            </tbody>

          </table>
        </>,
      },
      {
        'key': '6',
        'element': 'hr',
        'clase': 'line'
      },
      {
        'key': '3',
        'element': 'label',
        'text': 'Indicaciones:',
        'use': false,
        'clase': 'information-message'
      },
      {
        'key': '4',
        'element': 'label',
        'text': 'Puede recoger su paquete en la tienda al siguiente dia hábil con su nombre en la siguiente dirección: ',
        'use': false,
        'clase': 'information-message-text'
      },
      {
        'key': '5',
        'element': 'text',
        'clase': 'location',
        'text': <>
          <a className='location' href={'https://goo.gl/maps/BfBLwWiTAGLNAd8d6'} text={'Click aqui para abrir ubicacion'} />
        </>
      }
    ])
  }, [product])

  return (
    <>
      {
        descriptionFields.length == 0 ? <Loading /> : <Form title={'Confirmación de reserva'} formType={'description'} formFields={descriptionFields} justContinue={true} continueHandle={() => {
          localStorage.removeItem("confimation");
          navigate('../../../feed')
        }} continuePath={'/feed'} continueText={'Continuar'} Activo={true} />
      }
    </>
  )
}

export default ThirdStep