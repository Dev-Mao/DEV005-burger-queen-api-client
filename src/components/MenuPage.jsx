import { useState, useEffect } from 'react';
import Category from './wall/Category';
import ClientName from './wall/ClientName';
import { BiPlusMedical } from 'react-icons/bi';
import ModalOrder from './wall/ModalOrder';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contenedor de los productos del menú
const ProductContainer = (props) => {
  // Creación de estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);

  // Función para añadir productos a la orden
  const onAddProduct = product => {
    
    toast.success('Product added successfully', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    // Compara el id del producto elegido con los id de los productos presentes en la orden
    // Si el producto ya está, se le añade +1 a la cantidad, si no, se guarda 
		if (props.allProducts.find(item => item.id === product.id)) {
			const products = props.allProducts.map(item =>
				item.id === product.id
					? { ...item, qty: item.qty + 1 }
					: item
			);
      // Actualizamos el total, la cantidad de prodyctos y la lista de productos
      props.setTotal(props.total + product.price * product.qty);
			props.setCountProducts(props.countProducts + product.qty);
			return props.setAllProducts([...products]);
		}

    // Actualizamos el total, la cantidad de prodyctos y la lista de productos
    props.setTotal(props.total + product.price * product.qty);
		props.setCountProducts(props.countProducts + product.qty);
		props.setAllProducts([...props.allProducts, product]);

	};

  // Mandamos solicitud a la api para traer todos los productos cada que haya un cambio de elección categoría menú 
  useEffect(() => {

    // Obtenemos el token 
    const token = localStorage.getItem('token');

    fetch('https://api-mock-bq-99b0fe710281.herokuapp.com/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Filtramos los productos dependiendo del menú elegido
        const filteredProducts = data.filter(product => product.type === props.selectedMenu);
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('API error:', error);
      });
  }, [props.selectedMenu]);

  return (
    <>
      <ToastContainer />
      <section className='section-menu'>
        <div className="container-products">
          {products.map(product => (
            <div key={product.id} className='card-product'>
              <button className='btn-add-product' onClick={() => onAddProduct(product)}><BiPlusMedical/></button>
              <span>{product.name}</span>
              <div className='img-container'>
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <span>${product.price}.00</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const MenuPage = (props) => {
  // Estado para almacenar la categoría de menú seleccionado
  const [selectedMenu, setSelectedMenu] = useState('breakfast');

  // Función encargada de cambiar la categoría del menú
  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };  

  return (
    <>    
      {/* Si showModal es verdadero se muestra */}
      {(props.showModalOrder ? <ModalOrder setShowModalOrder = {props.setShowModalOrder}/> : '')}                   
      <Category onSelect={handleMenuSelect} />
      <ClientName 
        setClientName = {props.setClientName} 
        clientNameError = {props.clientNameError} 
        setClientNameError = {props.setClientNameError}
      />
      <ProductContainer 
      selectedMenu={selectedMenu} 
      setAllProducts = { props.setAllProducts } 
      allProducts = {props.allProducts}
      total={props.total}
      setTotal={props.setTotal}
      countProducts={props.countProducts}
      setCountProducts={props.setCountProducts}
      />
    </>
  );
};

export { MenuPage, ProductContainer };


MenuPage.propTypes = {
  allProducts: PropTypes.array,
  setAllProducts: PropTypes.func,
  showModalOrder: PropTypes.bool,
  setShowModalOrder: PropTypes.func,
  setClientName: PropTypes.func,
  clientNameError: PropTypes.string,
  setClientNameError: PropTypes.func,
  productsSelected: PropTypes.objectOf(PropTypes.number),
  total: PropTypes.number,
  setTotal: PropTypes.func,
  countProducts: PropTypes.number,
  setCountProducts: PropTypes.func,
};

ProductContainer.propTypes = {
  allProducts: PropTypes.array,
  setAllProducts: PropTypes.func,  
  total: PropTypes.number,
  setTotal: PropTypes.func,
  countProducts: PropTypes.number,
  setCountProducts: PropTypes.func,
  selectedMenu: PropTypes.string,
};