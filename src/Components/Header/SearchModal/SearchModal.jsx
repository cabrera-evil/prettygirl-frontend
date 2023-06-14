import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './SearchModal.scss'

const SearchModal = ({ cancelSearch }) => {
    // Url to get the categories from the API
    const categoriesUrl = "/api/categories";

    // Url to get filtered products from the API
    let url = "/api/products?";
    let filterFlag = false;

    // Navigate to the filtered products page function
    const navigate = useNavigate();

    // Set categories from API
    const [Categories, setCategories] = useState();

    // Set combo box values
    const [sizeOptions, setSizeOptions] = useState([]);
    const [category, setCategory] = useState('');
    const [AllowSize, setAllowSize] = useState(false);

    // Set search filters
    const [GenderSearch, setGenderSearch] = useState(false);
    const [ColorSearch, setColorSearch] = useState(false);
    const [CategorySearch, setCategorySearch] = useState(false);
    const [SizeSearch, setSizeSearch] = useState(false);

    // Button states
    const [FilterButton, setFilterButton] = useState(false);
    const [ResetButton, setResetButton] = useState(false);

    useEffect(() => {
        // Validate if we have any filter selected
        if (GenderSearch || ColorSearch || CategorySearch || SizeSearch)
            filterFlag = true;
        else
            filterFlag = false;

        // Set filter url
        if (filterFlag) {
            if (GenderSearch) {
                url += `gender=${GenderSearch}&gender=Unisex`;
                // Validate if we have more than one filter
                if (ColorSearch)
                    url += `&color=${ColorSearch}`;
                if (CategorySearch) {
                    url += `&category=${CategorySearch}`;
                    if (SizeSearch)
                        url += `&size=${SizeSearch}`;
                }
            }
            else if (ColorSearch) {
                url += `color=${ColorSearch}`;
                // Validate if we have more than one filter
                if (CategorySearch) {
                    url += `&category=${CategorySearch}`;
                    if (SizeSearch)
                        url += `&size=${SizeSearch}`;
                }
            }
            else if (CategorySearch) {
                url += `category=${CategorySearch}`;
                // Validate if we have more than one filter
                if (SizeSearch)
                    url += `&size=${SizeSearch}`;
            }
        }
        // Verify if the filter it's clicked
        if (FilterButton) {
            // Reset button values
            setFilterButton(false);
            cancelSearch(false);
            // Reload page if we are in the same page
            if (window.location.pathname === '/feed/filtered')
                window.location.reload();
            // Navigate to the filtered page
            navigate('/feed/filtered', {
                state: {
                    filteredUrl: url
                }
            });
        }
    }, [GenderSearch, ColorSearch, CategorySearch, SizeSearch, FilterButton]);

    useEffect(() => {
        let _sizeOptions;
        let i = 0;
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

        if (category === 'Bikini' || category === 'Camisas' || category === 'Vestidos')
            _sizeOptions = clothesSizeOptions
        else if (category === 'Zapatos')
            _sizeOptions = shoesSizes;
        else if (category === 'Pantalones' || category === 'Shorts')
            _sizeOptions = jeansSizes;
        else
            _sizeOptions = [{ 'value': 'Selecciona una talla' }]

        const mappedOptions = _sizeOptions.map(option => {
            i++;
            return (
                <option key={i} value={option.value}>{option.value}</option>
            )
        })

        setSizeOptions(mappedOptions);

    }, [category])

    useEffect(() => {
        const getData = async () => {
            let { data } = await axios.get(categoriesUrl);
            const mappedCategories = (data.categories).map((cat, index) => {
                return <option key={index} value={cat.value}>{cat.name}</option>
            })
            setCategories(mappedCategories);
        };
        getData();
    });

    return (
        <div className='modal-container'>
            <section className="search-modal">
                <div className="search-modal-filters">
                    <h3>Búsqueda por filtros</h3>
                    <div className="form-filters">
                        <label>Género:
                            <select name="genre" className="select-genre" onChange={(e) => {
                                if (e.target.value === "man")
                                    setGenderSearch("Masculino")
                                else if (e.target.value === "woman")
                                    setGenderSearch("Femenino")
                                else
                                    setGenderSearch(false)
                            }}>
                                <option value="none">Selecciona tu género</option>
                                <option value="woman">Mujer</option>
                                <option value="man">Hombre</option>
                            </select>
                        </label>
                        <label>Color:
                            <select name="color" className="select-color" onChange={(e) => {
                                if (e.target.value !== "none")
                                    setColorSearch(e.target.value)
                                else
                                    setColorSearch(false)
                            }}>
                                <option value="none">Selecciona un color</option>
                                <option value="Aqua">Aqua</option>
                                <option value="Azul">Azul</option>
                                <option value="Amarillo">Amarillo</option>
                                <option value="Beige">Beige</option>
                                <option value="Blanco">Blanco</option>
                                <option value="Café">Café</option>
                                <option value="Celeste">Celeste</option>
                                <option value="Gris">Gris</option>
                                <option value="Naranja">Naranja</option>
                                <option value="Negro">Negro</option>
                                <option value="Purpura">Purpura</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Verde">Verde</option>
                            </select>
                        </label>
                        {/* Puede dejar sin seleccionar la categoría */}
                        <label>Categoría:
                            <select name="category" className="select-category" onChange={(e) => {
                                setCategory(e.target.value);
                                if (e.target.value !== "none") {
                                    setCategorySearch(e.target.value);
                                    setAllowSize(true);
                                }
                                else {
                                    setCategorySearch(false);
                                    setAllowSize(false);
                                    setSizeSearch(false);
                                }
                            }}>
                                <option value="none">Selecciona una categoría</option>
                                {Categories}
                            </select>
                        </label>
                        {/* Si no ha seleccionado una categoría entonces no podrá escoger una talla porque este cambia según el tipo de producto */}
                        {AllowSize ? (<label>Talla:
                            <select name="size" className="select-size" onChange={(e) => {
                                setSizeSearch(e.target.value);
                            }}>
                                {sizeOptions}
                            </select>
                        </label>) : <></>}
                        <div className="actions">
                            <button name="clean" className="search-modal-filter-clean" onClick={(e) => {
                                document.querySelector(".select-genre").selectedIndex = 0;
                                document.querySelector(".select-color").selectedIndex = 0;
                                document.querySelector(".select-category").selectedIndex = 0;
                                document.querySelector(".select-size").selectedIndex = 0;
                                setGenderSearch(0);
                                setColorSearch(0);
                                setCategorySearch(0);
                                setSizeSearch(0);
                            }
                            }>Limpiar</button>
                            <button name="filter" className="search-modal-filter" onClick={(e) => { setFilterButton(true) }}>Filtrar</button>
                        </div>
                    </div>
                </div>
                <div className='close' onClick={() => { cancelSearch(false); }}>
                </div>
            </section>
        </div>
    )
}

export default SearchModal