import { useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiPlusMedical } from 'react-icons/bi';
import { FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Order = (props) => { 

  // Obtener token almacenado en localStorage
  const token = localStorage.getItem('token');
  // Crear un nuevo estado para los productos que hay en la orden 
  const [orderProducts, setOrderProducts] = useState([]);

  // Función para cerrar la vista de órdenes
  const handleClick = () => {
    props.setShowOrder(false); 
  };
 
  // Cuando haya cambios en los productos de la orden, se actualicen con updateOrderProducts
  useEffect(() => {
     // Actualizar los productos que hay en la orden y sus cantidades
    const updateOrderProducts = () => {
      const products = props.allProducts.map((product) => ({
        id: product.id,
        name: product.name,
        qty: product.qty,
      }));
      setOrderProducts(products);
    };
    
    updateOrderProducts(); // Initialize orderItems
  }, [props.allProducts]);

  // Guardar orden en la API
  const onSendOrder = () =>{
    // Obtenemos el id del usuario que realizó la orden
    const userId = localStorage.getItem('userId');

    //Información del body que se envía en la solicitud a la API
    const orderData = {
      client: props.clientName,
      userId: userId,
      products: orderProducts,
      status: 'pending',
      total: props.total,
      dateEntry: new Date(Date.now()).toLocaleTimeString()
    };

    // Solicitud a la API
    fetch('http://localhost:8080/orders',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Se envía token de autorización
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData)
    })
    .then(() => {
      // Volver todo a sus valores iniciales
      props.setAllProducts([])
      props.setCountProducts(0)
      props.setTotal(0)
      // Cerrar ventada de order
      handleClick();
      // Mostrar el modal de enviado exitoso
      props.setShowModalOrder(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }  

  // Eliminar producto de la orden (ícono de basura)
  const onDeleteProduct = product => {

    // Dejar solo los productos que no se han eliminado
		const results = props.allProducts.filter(
			item => item.id !== product.id
		);

    // Cambiar los estados de total de productos, precio total y lista de productos
		props.setTotal(props.total - product.price * product.qty);
		props.setCountProducts(props.countProducts - product.qty);
		props.setAllProducts(results);
    
    // Actualizamos productos que se envían a la solicitud
    setOrderProducts((prevProducts) => prevProducts.filter((prevProduct) => prevProduct.id !== product.id));
  };

  // Disminuir la cantidad de productos
  const onReduceProduct = product => {
    // Si la cantidad es 1, se llama a onDeleteProduct
    if (product.qty === 1) {
      onDeleteProduct(product);
    } else {
      // Actualizar la cantidad de productos y el precio total 
      const newQuantity = product.qty - 1;
      props.setTotal(props.total - product.price);
      props.setCountProducts(props.countProducts - 1);
      props.setAllProducts(prevProducts =>
        // Se actualiza la cantidad del producto
        prevProducts.map(prevProduct =>
          prevProduct.id === product.id ? { ...prevProduct, qty: newQuantity } : prevProduct
        )
      );
      // Se actualizan los productos a enviar en la solicitud
      setOrderProducts((prevProducts) =>
      prevProducts.map((prevProduct) => (prevProduct.id === product.id ? { ...prevProduct, qty: newQuantity } : prevProduct))
      );
    }
  };

  // Aumentar la cantidad de productos
  const onIncreaseProduct = product => {    
    const newQuantity = product.qty + 1;
    // Actualizar la cantidad de productos y el precio total
    props.setTotal(props.total + product.price);
    props.setCountProducts(props.countProducts + 1);
    // Se actualiza la cantidad del producto
    props.setAllProducts(prevProducts =>
      prevProducts.map(prevProduct =>
        prevProduct.id === product.id ? { ...prevProduct, qty: newQuantity } : prevProduct
      )
    );
    
    // Se actualizan los productos a enviar en la solicitud
    setOrderProducts((prevProducts) =>
      prevProducts.map((prevProduct) => (prevProduct.id === product.id ? { ...prevProduct, qty: newQuantity } : prevProduct))
    );
  }; 

  return (  
    <>      
      <CgClose className="icon-close-order" onClick={handleClick} /> 
      <section className="section-orders">
        <h1 className="order-title">Order</h1>
        <div className='container-name-client-order'>
          <span className='name-client-order'>Client: {props.clientName}</span>
        </div>
        <table className="orders-title-table">
          <thead className="titles-orders-table">                    
              <tr>
                  <th className='order-celd1' scope="col">Product</th>
                  <th className='order-celd2' scope="col">Quantity</th>
                  <th className='order-celd3' scope="col">Price</th>            
              </tr>                   
            </thead>
        </table>
        <div className="order-container">
          <table className="orders-content-table">
            <tbody className="content-orders-table">
              {props.allProducts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="no-products-message">Add products</td>
                </tr>
              ) : (
                props.allProducts.map(product => (
                  <tr key={product.id}>
                    <th className='order-celd4' scope="col">{product.name}</th>
                    <th className='order-celd5' scope="col">
                      <FaMinus className='minus-icon' onClick={() => onReduceProduct(product)}/>
                      <span className='qty-span'>{product.qty}</span>
                      <BiPlusMedical className='plus-icon' onClick={() => onIncreaseProduct(product)}/>
                    </th>
                    <th className='order-celd6' scope="col">
                      ${product.qty * product.price}.00
                      <RiDeleteBin5Line className='delete-icon' onClick={() => onDeleteProduct(product)}/>
                    </th>            
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <table className="orders-content-table">
            <tbody className={`content-orders-table  ${props.total > 0 ? '' : 'hidden'}`}>                    
              <tr>
                  <th className='order-celd4' scope="col"></th>
                  <th className='order-celd4' scope="col">TOTAL:</th>
                  <th className='order-celd-total' scope="col">${props.total}.00</th>            
              </tr>                   
            </tbody>
        </table>
        <button type="submit" onClick={onSendOrder} className={`btn-send-order  ${props.total > 0 ? '' : 'hidden'}`}>
          Send order
        </button>
      </section>
    </>
  );
};
export default Order;


Order.propTypes = {
  allProducts: PropTypes.array,
  setAllProducts: PropTypes.func,
  total: PropTypes.number,  
  setShowOrder: PropTypes.func,
  clientName: PropTypes.string,
  setCountProducts: PropTypes.func,
  setTotal: PropTypes.func,
  countProducts: PropTypes.number,
  setShowModalOrder: PropTypes.func,
  setOrdersReady:  PropTypes.func,
};