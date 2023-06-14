import React, { useEffect, useState } from 'react'
import './AddProduct.scss'
import ImageUploader from '../../ImageUploader/ImageUploader'
import Button from '../../Button/Button'
import Label from '../../Form/Label/Label'
import Combobox from './ComboBox/ComboBox';
import { Link } from "react-router-dom";

import axios from 'axios'
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading'

const AddProduct = () => {
  // Input variables
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  const [genre, setGenre] = useState('');
  const [categories, setCategories] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([{ 'value': 'Selecciona una talla' }]);
  // Colors and Sizes to save in the database
  const [size, setSize] = useState('none');
  const [color, setColor] = useState('none');
  // Form fields
  const [formFields, setFormFields] = useState([]);
  const [detailsFields, setDetailsFields] = useState([]);
  // Auxiliar variables for color and sizes
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [_color, _setColor] = useState(true);
  const [_size, _setSize] = useState(true);
  const [formData, setFormData] = useState(new FormData());
  const [loading, setLoading] = useState(true);
  const url = "/api/categories/";

  const handleSubmit = async () => {
    const url = "/api/products";
    const token = localStorage.getItem('token');

    // Header variables configuration
    const config = {
      headers: { "x-token": token }
    };

    // Upload picture to cloudinary
    const response = await fetch("https://api.cloudinary.com/v1_1/cabrera-evil/upload", { body: formData, params: formData.get("upload_preset"), method: "POST" });
    const cloudR = await response.json();

    // Test variable
    const sized = ['small', 'medium', 'large'];

    const body = {
      'name': name,
      'category': category,
      'size': sized,
      'color': colors,
      'gender': genre,
      'available': true,
      'amount': quantity,
      'price': price,
      'picture': cloudR.url,
    };

    axios.post(url, body, config)
      .then(response => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${name} ha sido agregado exitosamente`,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
          })
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al agregar el producto',
        })
      });

    // Reset form fields 
    setName('');
    setPrice(0);
    setQuantity(1);
    setCategory('');
    setSizeOptions([{ 'value': 'Selecciona una talla' }]);
    setSize('none');
    setColor('none');
    setColors('');
    setSizes('');
    handleFornRender();

  }

  // For getting categories from the API
  useEffect(() => {
    const categoryOptions = [
      { 'value': 'Selecciona una categoría' }
    ];

    const getCategories = async () => {
      await axios.get(url).then(data => {
        data = data.data;
        for (let i = 0; i < data.total; i++) {
          const option = { 'value': data.categories[i].name };
          categoryOptions.push(option);
        }
        setCategories(categoryOptions.length > 1 ? categoryOptions : [{ 'value': 'Seleciona una categoría' }]);
      }).
        catch(error => console.log(error))
    }
    getCategories();
  }, [])

  // Combobox options
  const genreOptions = [
    { 'value': 'Selecciona un género' },
    { 'value': 'Masculino' },
    { 'value': 'Femenino' },
    { 'value': 'Unisex' },
  ];
  const colorOptions = [
    { 'value': 'Selecciona un color' },
    { 'value': 'Aqua' },
    { 'value': 'Azul' },
    { 'value': 'Amarillo' },
    { 'value': 'Beige' },
    { 'value': 'Blanco' },
    { 'value': 'Cafe' },
    { 'value': 'Celeste' },
    { 'value': 'Gris' },
    { 'value': 'Naranja' },
    { 'value': 'Negro' },
    { 'value': 'Purpura' },
    { 'value': 'Rojo' },
    { 'value': 'Verde' },
  ];

  // For Fields rendering just when categories are loaded
  const handleFornRender = () => {
    const fields = [{
      'key': '1',
      'element': 'label',
      'clase': 'whole-space',
      'type': 'text',
      'text': 'Nombre',
      'setValue': setName,
    }, {
      'key': '2',
      'element': 'label',
      'clase': '',
      'type': 'number',
      'text': 'Precio',
      'setValue': setPrice,
    }, {
      'key': '3',
      'element': 'label',
      'clase': '',
      'type': 'number',
      'text': 'Stock',
      'setValue': setQuantity,
    }, {
      'key': '4',
      'element': 'combobox',
      'clase': 'combobox',
      'type': 'combobox',
      'text': 'Categoría',
      'setValue': setCategory,
      'options': categories
    }, {
      'key': '5',
      'element': 'combobox',
      'clase': 'combobox',
      'type': 'text',
      'text': 'Género',
      'setValue': setGenre,
      'options': genreOptions
    }]

    const mappedForm = fields.map((field) => {
      if (field.element === 'label') {
        return (
          <Label key={field.key} type={field.type} text={field.text} valueInput={field.value} setValue={field.setValue} InputUse={field.use} clase={field.clase ? field.clase : false} />
        )
      }
      if (field.element === 'combobox') {
        return (
          <Combobox key={field.key} clase={field.clase} name={field.name} options={field.options} setOption={field.setValue} />
        )
      }
    });

    setLoading(true)
    setFormFields(mappedForm);
  }

  useEffect(() => {
    handleFornRender();
  }, [categories])

  // For updating textareas and comoboxes of size and color
  const handleColorChange = () => {
    if (!_color) setColor('none');
    if (_color) {
      const _colors = colors;
      const initColor = _colors.findIndex(item => color == item);
      if (initColor != -1) _colors.splice(initColor, 1);
      if (initColor == -1 && color !== 'none' && color !== 'Selecciona un color') _colors.push(color);
      setColors(_colors);
      _setColor(false);
    }
  }

  const handleSizeChange = () => {
    if (!_size) setSize('none');
    if (_size) {
      const _sizes = sizes;
      const initSize = _sizes.findIndex(item => size == item);
      if (initSize != -1) _sizes.splice(initSize, 1);
      if (initSize == -1 && size !== 'none' && size !== 'Selecciona una talla') _sizes.push(size);
      setSizes(_sizes);
      _setSize(false);
    }
  }

  useEffect(() => {
    handleSizeChange();
    handleColorChange();
  }, [_size, _color])

  useEffect(() => {
    const clothesSizeOptions = [
      { 'value': 'Selecciona una talla' },
      { 'value': 'XS' },
      { 'value': 'S' },
      { 'value': 'M' },
      { 'value': 'L' },
      { 'value': 'XL' }
    ];
    const shoesSizes = [
      { 'value': 'Selecciona una talla' },
      { 'value': '4.0' },
      { 'value': '4.5' },
      { 'value': '5.0' },
      { 'value': '5.5' },
      { 'value': '6.0' },
      { 'value': '6.5' },
      { 'value': '7.0' },
      { 'value': '7.5' },
      { 'value': '8.0' },
      { 'value': '8.5' },
      { 'value': '9.0' },
      { 'value': '9.5' },
      { 'value': '10.0' },
      { 'value': '10.5' },
      { 'value': '11.0' },
      { 'value': '11.5' },
      { 'value': '12.0' },
      { 'value': '12.5' },
      { 'value': '13.0' },
      { 'value': '13.5' },
      { 'value': '14.0' },
    ];
    const jeansSizes = [
      { 'value': 'Selecciona una talla' },
      { 'value': '26' },
      { 'value': '27' },
      { 'value': '28' },
      { 'value': '29' },
      { 'value': '30' },
      { 'value': '31' },
      { 'value': '32' },
      { 'value': '33' },
      { 'value': '34' },
      { 'value': '35' },
      { 'value': '36' },
      { 'value': '37' },
      { 'value': '38' },
      { 'value': '39' },
      { 'value': '40' },
      { 'value': '41' },
      { 'value': '42' },
      { 'value': '43' },
      { 'value': '44' },
    ];

    if (category === 'Accesorios' || category === 'Bolsos' || category === 'Lentes'){
      setSizeOptions([{ 'value': 'Selecciona una talla' }]);
      setSizes([]);
      setColors([]);
    }
    else if (category === 'Bikini' || category === 'Camisas' || category === 'Vestidos'){
      setSizeOptions(clothesSizeOptions);
      setSizes([]);
      setColors([]);
    }
    else if (category === 'Zapatos'){
      setSizeOptions(shoesSizes);
      setSizes([]);
      setColors([]);
    }
    else if (category === 'Pantalones' || category === 'Shorts'){
      setSizeOptions(jeansSizes);
      setSizes([]);
      setColors([]);
    }
  }, [category])

  useEffect(() => {
    if (color !== 'none' && color !== 'Selecciona un color') {
      _setColor(true);
      _setSize(false);
    }
    if (size !== 'none' && size !== 'Selecciona un talla') {
      _setSize(true);
      _setColor(false);
    }

    const details = [
      {
        'key': '6',
        'element': 'combobox',
        'clase': 'combobox',
        'name': 'reusable',
        'type': 'text',
        'text': 'Talla',
        'setValue': setSize,
        'options': sizeOptions
      }, {
        'key': '7',
        'element': 'combobox',
        'clase': 'combobox',
        'name': 'reusable',
        'type': 'text',
        'text': 'Color',
        'setValue': setColor,
        'options': colorOptions
      },
      {
        'key': '8',
        'element': 'label',
        'clase': 'textarea',
        'type': 'textarea',
        'text': 'Tallas',
        'value': sizes
      },
      {
        'key': '9',
        'element': 'label',
        'clase': 'textarea',
        'type': 'textarea',
        'text': 'Colores',
        'value': colors
      }
    ]

    const mappedDetails = details.map((field) => {
      if (field.element === 'label') {
        return (
          <Label key={field.key} type={field.type} text={field.text} valueInput={field.value} setValue={field.setValue} InputUse={field.use} clase={field.clase ? field.clase : false} />
        )
      }
      if (field.element === 'combobox') {
        return (
          <Combobox key={field.key} clase={field.clase} name={field.name} options={field.options} setOption={field.setValue} />
        )
      }
    });

    setDetailsFields(mappedDetails);
  }, [sizeOptions, size, color])

  useEffect(() => {
    setLoading((formFields.length > 0 && categories.length > 0) ? false : true);
  }, [formFields])

  return (
    <>
      {
        loading ? <Loading></Loading> :
          <>
            <section className='add-product'>
              <ImageUploader setFormData={setFormData} />
              <div className='form-container'>
                <form className='add-product'>
                  <h1>Información de producto</h1>
                  <div className="formFields">
                    {formFields}
                    {detailsFields}
                  </div>
                  <div className="actions">
                    <Link ><Button clase='continue' onClick={(e) => handleSubmit(e)} text={'Agregar'} /></Link>
                    <Link to={'/feed'}><Button clase='cancel' text={'Cancelar'} /></Link>
                  </div>
                </form>
              </div>
            </section>
          </>
      }
    </>
  )
}

export default AddProduct