import './ProductDescription.scss';
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Loading/Loading';
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import { useConfigContext } from '../../../Contexts/ConfigContext';
import Swal from 'sweetalert2'
import moment from 'moment';
import Combobox from '../../Form/ComboBox/ComboBox';
import Label from '../../Form/Label/Label';
import Button from '../../Button/Button';
import H from '../../H/H'

let agregando = false;

function ProductDescription({ id }) {

  const [formFields, setFields] = useState([]);
  const [dinamycfields, setDinamycFields] = useState();

  const url = "/api/products/" + id;
  const [encontrado, setEncontrado] = useState(false);
  const [loading, setLoading] = useState(true);
  const context = useConfigContext();

  const [Talla, setTalla] = useState('Selecciona una talla');
  const [Color, setColor] = useState('Selecciona un color');

  const [_talla, _setTalla] = useState('');
  const [_color, _setColor] = useState('');

  const [Datos, setDatos] = useState([]);
  const [combobox, setCombobox] = useState([]);
  const [Descripcion, setDescription] = useState([])
  const [img, setImg] = useState([])
  const [Boton, setButton] = useState([]);
  const [Update, setUpdate] = useState(false);
  const [SelectedIndex, setSelectedIndex] = useState({
    c1: {
      index: 'Selecciona una talla',
    },
    c2: {
      index: 'Selecciona un color',
    }
  });

  useEffect(() => {
    let index = 1;
    const mappedCombobox = formFields.map((field) => {
      if (field.element === 'combobox') {
        if (index == 1) {
          return (
            <Combobox key={field.key} clase={'save-index'} name={field.name} options={field.options} setOption={field.setOption} selectedIndex={SelectedIndex} setIndex={setSelectedIndex} id={index} Comboboxindex={field.index} update={setUpdate} />
          )
        }
        else if (index == 2) {
          return (
            <Combobox key={field.key} clase={'save-index'} name={field.name} options={field.options} setOption={field.setOption} selectedIndex={SelectedIndex} setIndex={setSelectedIndex} id={index} Comboboxindex={field.index} update={setUpdate} />
          )
        }
        index++;
      }
    });
    setCombobox(mappedCombobox);
    setUpdate(false);
  }, [formFields])

  useEffect(() => {
    setSelectedIndex({
      c1: {
        index: 'Selecciona una talla',
      },
      c2: {
        index: 'Selecciona un color',
      }
    });
    setColor('Selecciona un color');
    setTalla('Selecciona una talla');
  }, [id])

  useEffect(() => {

    const getData = async () => {
      setFields([]);
      let { data } = await axios.get(url);

      data.createdAt = (data.createdAt.slice(0, data.createdAt.indexOf('T')));

      const Dia_Actual = new Date().getDate();
      const Mes_Actual = new Date().getMonth();
      const Dia = new Date(data.createdAt).getDate();
      const Mes = new Date(data.createdAt).getMonth();

      const talla = [
        { 'value': 'Selecciona una talla' }
      ]
      talla.push(...data.size.map(t => {
        return { 'value': t }
      }))
      const color = [
        { 'value': 'Selecciona un color' }
      ];
      color.push(...data.color.map(c => {
        return { 'value': c }
      }))
      const formFields = [{
        'key': '1',
        'element': 'label',
        'text': Dia + 7 >= Dia_Actual && Mes_Actual == Mes ? 'Nuevo/Exclusivo' : 'Nuevo',
        'use': false,
        'clase': 'TipoProducto'
      },
      {
        'key': '2',
        'element': 'h3',
        'text': data.name,
        'use': false,
        'clase': 'NombreProducto'
      },
      {
        'key': '3',
        'element': 'label',
        'text': 'US$' + data.price,
        'use': false,
        'clase': 'PrecioProducto'
      },
      {
        'key': '4',
        'element': 'combobox',
        'name': 'Talla',
        'options': talla,
        'clase': 'Talla',
        'index': 1,
        'setOption': setTalla
      },
      {
        'key': '5',
        'element': 'combobox',
        'name': 'Color',
        'options': color,
        'clase': 'Color',
        'index': 2,
        'setOption': setColor
      },
      {
        'key': '6',
        'element': 'img',
        'src': data.picture,
        'clase': 'ImagenProducto'

      },
      {
        'key': '7',
        'element': context.isLogged && localStorage.getItem("role") === 'CLIENT_ROLE' ? 'button' : '',
        'text': 'Agregar a la bolsa',
        'onClick': () => { PushBag(id, Color, Talla, setColor, setTalla) },
        'clase': 'AgregarCarrito'
      },
      ]
      setFields(formFields);
      setEncontrado(true);
    }
    getData();

  }, [id, Update]);


  useEffect(() => {
    if (formFields.length > 0) {
      setLoading(true)
      const mappedDatos = formFields.map(field => {
        if (field.element === 'label') {
          return (
            <Label key={field.key} text={field.text} InputUse={field.use} clase={field.clase ? field.clase : false} />
          )
        }
      });

      const mapeedButton = formFields.map(btn => {
        if (btn.element === 'button') {
          return (
            <Button key={btn.key} clase={'add-to-bag'} text={btn.text} onClick={btn.onClick} />
          )
        }
      });
      const mapeedimg = formFields.map(img => {
        if (img.element === 'img') {
          return (
            <img key={img.key} src={img.src} />
          )
        }
      })
      const mappedDescription = formFields.map(field => {
        if (field.element[0] === 'h') {
          return (
            <H key={field.key} text={field.text} type={field.element} />
          )
        }
      });

      setDatos(mappedDatos);
      setDescription(mappedDescription)
      setButton(mapeedButton);
      setImg(mapeedimg);
    }
    setLoading(false);
  }, [formFields]);

  return (
    <section className='product-description-container'>
      {
        loading ? <Loading></Loading> : <>
          <div className='container-description'>
            <figure className='form-img'>
              {img}
            </figure>
            <div className='form'>
              <div className='form-datos'>
                {Datos}
              </div>
              <div className='form-description'>
                {Descripcion}
              </div>
              <div className='form-combobox'>
                {combobox}
              </div>
              <div className="actions">
                {Boton}
              </div>
            </div>
          </div>
        </>
      }
      <ProductsContainer title={'Recomendados para ti'} />
    </section>
  );
}
export default ProductDescription;


async function PushBag(id, color, talla, setColor, setTalla) {
  if (color !== 'Selecciona un color' && talla !== 'Selecciona una talla') {
    if (!agregando) {
      agregando = true;
      let url = "/api/auth/validate/" + localStorage.getItem("token");
      await axios.get(url).then(TokenData => {
        if (TokenData.data.exp >= moment().unix()) {
          url = "/api/bags/" + TokenData.data.uid;
          const config = {
            headers: {
              'x-token': localStorage.getItem("token")
            }
          };
          axios.get(url, config).then((datos) => {
            console.log(datos.data.length)
            if (datos.data.length == 0) {
              url = "/api/bags/";
              const config = {
                headers: {
                  'x-token': localStorage.getItem("token")
                }
              };
              const data = {
                user: TokenData.data.uid,
                products: [
                  {
                    "_id": id,
                    amount: 1,
                    color: color,
                    size: talla
                  }
                ]
              }
              axios.post(url, data, config).then(data => {
                Swal.fire({
                  title: 'Agregado a la bolsa',
                
                  icon: 'success',
                  showConfirmButton: true,
                  timerProgressBar: true,
                  
                })
                setColor('Selecciona un color');
                setTalla('Selecciona una talla');

                agregando = false;
              }).catch(error => {
                Swal.fire({
                  title: 'Ocurrio un error vuelve a intentarlo',
                  
                  icon: 'error',
                  showConfirmButton: true,
                  timerProgressBar: true,
                  
                })
                agregando = false;
              }
              )
            }
            else {
              url = "/api/bags/" + datos.data[0]._id;
              const config = {
                headers: {
                  'x-token': localStorage.getItem("token")
                }
              };
              let data = {
                user: datos.data[0].user,
                products: []
              }
              let update = false;
              datos.data[0].products.forEach((element) => {
                if (element._id == id && element.color == color && element.size == talla) {
                  data.products.push({
                    "_id": element._id,
                    amount: element.amount + 1,
                    color: element.color,
                    size: element.size
                  })
                  update = true;
                }
                else {
                  data.products.push({
                    "_id": element._id,
                    amount: element.amount,
                    color: element.color,
                    size: element.size
                  })
                }
              });

              if (!update) data.products.push({
                "_id": id,
                amount: 1,
                color: color,
                size: talla
              })
              axios.put(url, data, config).then(data => {
                Swal.fire({
                  title: 'Agregado a la bolsa',
                  
                  icon: 'success',
                  showConfirmButton: true,
                  timerProgressBar: true,
                  
                })
                agregando = false;
              }).catch(error => {
                Swal.fire({
                  title: 'Ocurrio un error vuelve a intentarlo',
                  
                  icon: 'error',
                  showConfirmButton: true,
                  timerProgressBar: true,
                  
                });

                agregando = false;
              }
              )
            }
          })
        }
      })
    }
  }
  else {
    Swal.fire({
      title: 'Seleccione un color y una talla',
    
      icon: 'error',
      showConfirmButton: true,
      timerProgressBar: true,
    })
  }
}