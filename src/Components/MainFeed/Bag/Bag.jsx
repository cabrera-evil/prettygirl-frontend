import React, { useEffect, useState } from 'react'
import './Bag.scss'
import Button from '../../Button/Button'
import axios from 'axios'
import ProductsBag from '../ProductsBag/ProductsBag'
import Loading from '../../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Bag = () => {
  const [loading, setLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const [Value, SetValue] = useState(0);
  const [ID, SetID] = useState(0);
  const [notavailable, setnotAvailable] = useState(false);
  const navigate = useNavigate();
  const [eliminado, SetElimindo] = useState(-1);

  useEffect(() => {
    if (Value != 0) {
      setProducts(Products.map(data => {
        if (data.id == ID) {
          data.amount = parseInt(Value);
        }
        return data;
      }))
    }
  }, [Value, ID]);

  useEffect(() => {
    const getData = async () => {
      let url = "/api/auth/validate/" + localStorage.getItem('token');
      await axios.get(url).then(async (res) => {
        const config = {
          headers: {
            'x-token': localStorage.getItem("token")
          }
        };
        const uid = res.data.uid;
        await axios.get("/api/bags/" + res.data.uid, config).then(async (data) => {
          if (data.data.length > 0) {
            const _id = data.data[0]._id;
            url = '/api/bags/products/' + data.data[0]._id
            await axios.get(url, config).then((res) => {
              let fields = [
                {
                  user: uid,
                  bag: _id
                }
              ];
              let ProductColor = '';
              let Productid = [];
              res.data.map(async (item, index) => {
                await data.data[0].products.map(async (product, id) => {
                  if (item._id === product._id && ProductColor !== product.color) {
                    ProductColor = product.color;
                    Productid.push(id);
                    SetValue(product.amount)
                    fields.push({
                      _id: product._id,
                      id: index + 1,
                      available: item.available,
                      color: product.color,
                      name: item.name,
                      picture: item.picture,
                      price: item.price,
                      size: product.size,
                      amount: product.amount,
                      max: item.amount,
                      SetValue: SetValue,
                      SetID: SetID
                    });
                  }
                });
                return 'ok'
              })
              setProducts(fields)
            })
          }
          else setnotAvailable(true)
        })
      });
    }
    getData();
  }, []);
  useEffect(() => {
    if ((Products.length > 1 && !notavailable)) setLoading(false);
    if (Products.length == 1) {
      setnotAvailable(true)
    }
  }, [Products])
  useEffect(() => {
    if (notavailable) setLoading(false);
  }, [notavailable])

  useEffect(() => {
    if (eliminado != -1) {
      let data = {
        user: Products[0].user,
        products: []
      }
      Products.map((item, index) => {
        if (index != 0 && index != eliminado) {
          data.products.push({
            "_id": item._id,
            amount: item.amount,
            color: item.color,
            size: item.size,
          })
        }
      })
      let url = "/api/bags/" + Products[0].bag;
      const config = {
        headers: {
          'x-token': localStorage.getItem("token")
        }
      };
      axios.put(url, data, config).then((res) => {
        if (res.status == 200) {
          let product = Products.filter((item, index) => {
            return index != eliminado;
          });
          setProducts(product);
          SetElimindo(-1);
          setLoading(true)
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',
          })
        }
      })

    }
  }, [eliminado])

  return (
    <>
      {
        loading ? <Loading /> : <>
          <section className='bag-container'>
            {
              notavailable ?
                <div className='information-message'>
                  <figure>
                    <img src="https://res.cloudinary.com/cabrera-evil/image/upload/v1669599268/prettygirl-api/default/box_bjknfp.png" alt="empty" />
                  </figure>
                  <p> Aún no tienes nada en la bolsa :/ </p>
                </div> :
                <>
                  <ProductsBag bag={true} products={Products} SetElimindo={SetElimindo} />

                  <Button clase={'reserve'} text={'Reservar'} onClick={() => {
                    AddReserva(Products, navigate)
                  }} />
                </>
            }
          </section>
        </>
      }
    </>
  )
}

function AddReserva(Products, navigate) {
  localStorage.setItem('products', JSON.stringify(Products));
  navigate('/feed/booking/client-data');
}

export default Bag