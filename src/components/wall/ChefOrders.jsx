import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { BsSquare, BsCheckSquare } from 'react-icons/bs';
import handleChangeStatus from "./handleChangeStatus";

// Obtenemos token de autenticación
const token = localStorage.getItem('token');
const ChefOrders = (props) => {
  //Creción de estado para las órdenes que se van a mostrar 
  const [ordersChef, setOrdersChef] = useState([])
  //Creción de estado para manejar el click del botón de check  
  const [iconClicked, setIconClicked] = useState(false);

  // Función para obtener el tiempo que tardar una orden de estar pendiente a preparada, en minutos
  const minutes = (dateEntry, deliveryDate) => {
    const newDateEntry = new Date(`1/1/2023 ${dateEntry}`);
    const newDeliveryDate = new Date(`1/1/2023 ${deliveryDate}`);
    const timeDiff = newDeliveryDate.getTime() - newDateEntry.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));

    return minutes
  }   

  // Solicitud a la Api para obtener la órdenes
  useEffect(() => {           
    fetch('http://localhost:8080/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      // Filtrar la órdenes obtenidas, según el status, puede ser, "pending" o "delivering"
      const filteredOrders = data.filter(order => order.status === props.selectedOrderStatusChef);
      // Se almacenan la órdenes que se van a mostrar
      setOrdersChef(filteredOrders);
    })
    .catch(error => {
      console.error('API error:', error);
    });
    setIconClicked(false);
   }, [props.selectedOrderStatusChef, iconClicked]);   
    
  // Función para manejar el click en el ícono y cambiar su estatus en la base de datos 
  const handleIconClick = (order, newStatus) => {
    // Función encargada de cambiar el status de la orden en la base de datos
    handleChangeStatus(order, newStatus, token);
    setIconClicked(true);
  };

  return (
    <>
      <div className= "container-chef-orders">
        {ordersChef.length === 0 ? (
          <div className="no-orders-message">No orders</div>
        ) : (
          ordersChef.map(order => (
            <div key={order.id} className='card-order-chef'>
              <div className="order-num"> N° Order: {order.id}</div>
              <span className="client-name-chef-orders">Client: {order.client}</span>
              {order.products.map(product => (
                <li key={product.id}>
                  {product.qty} {product.name}
                </li>
              ))}
              <div className="check-and-hour">
                {props.selectedOrderStatusChef === 'pending' ? (
                  <BsSquare className="icon-check-status-chef" onClick={() => handleIconClick(order, 'delivering')}/>
                ) : (
                  <BsCheckSquare className="icon-check-status-chef" onClick={() => handleIconClick(order, 'pending')}/>
                )}
              </div>    
              <span className="hour">
                {props.selectedOrderStatusChef === 'pending' ? `Entry hour: ${order.dateEntry}` : `It took ${minutes(order.dateEntry, order.deliveryDate)} minutes`}
              </span>      
            </div>
          ))
        )}
      </div>        
    </>
  );
}    

export default ChefOrders;

ChefOrders.propTypes = {
    selectedOrderStatusChef: PropTypes.string, 
  };