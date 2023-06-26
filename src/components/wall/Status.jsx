import { CgClose } from 'react-icons/cg';
import { BsSquare, BsCheckSquare } from 'react-icons/bs';
import { useState } from 'react';
import PropTypes from 'prop-types';
import handleChangeStatus from './handleChangeStatus';


const Status = (props) => { 

  // Creación de estado para almacenar órdenes listas para entregar
  const [ordersReady, setOrdersReady] = useState([]);
  // Creación de estado para almacenar órdenes entregadas
  const [ordersDelivered, setOrdersDelivered] = useState([]);
   
  // Llamar al token almacenado
  const token = localStorage.getItem('token');

    // Solicitud a la API para traer las órdenes
    fetch('http://localhost:8080/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Filtramos las órdenes y guardamos las que tienen status delivering
        const ordersReadyToDeliver = data.filter(order => order.status === "delivering");
        setOrdersReady(ordersReadyToDeliver);
        // Filtramos las órdenes y guardamos las que tienen status delivering
        const ordersDone = data.filter(order => order.status === "delivered");
        setOrdersDelivered(ordersDone);
      })
      .catch(error => {
        console.error('API error:', error);
      });

  
  // Cerrar vista de status
  const handleClick = () => {
    props.setShowStatus(false)
  }

  return (  
    <>      
      <CgClose className="icon-close-status" onClick = {handleClick}/> 
      <section className="section-status">
        <h1 className="status-title">Orders status</h1>
        <table className="status-title-table">
          <thead className="titles-status-table">                    
            <tr>
                <th className='status-celd1' scope="col">Ready to deliver</th>
                <th className='status-celd3' scope="col">Delivered</th>         
            </tr>                   
          </thead>
        </table>
        <div className="status-container">         
          <table className="status-content-table">
            <tbody className="container-status"> 
             <th className= "ready-to-deliver-column" scope="col">
                {ordersReady.map(order =>{
                return(                                     
                    <tr  className="ready-to-deliver-row" key = {order.id}  scope="col">
                      <div className="container-status-order">
                        <div className="order-num"> N° Order: {order.id}</div>
                        <span>Client: {order.client}</span>
                        <ul>
                          {order.products.map(product => (
                            <li key={product.id}>
                              {product.qty} {product.name}
                            </li>
                          ))}
                        </ul>
                        <span>Total: ${order.total}.00</span>
                        <BsSquare className="icon-check-status"onClick={() => handleChangeStatus(order, 'delivered', token)}/>
                      </div>
                    </tr>                  
                  )
              })}
              </th> 
               
              <th className= "delivered-column" scope="col">
              {ordersDelivered.map(order =>{
                return(                                     
                    <tr  className="delivered-row" key = {order.id}  scope="col">
                      <div className="container-status-order">
                        <div className="order-num"> N° Order: {order.id}</div>
                        <span>Client: {order.client}</span>
                        <ul>
                          {order.products.map(product => (
                            <li key={product.id}>
                              {product.qty} {product.name} 
                            </li>
                          ))}
                        </ul>
                        <span>Total: ${order.total}.00</span>
                        <BsCheckSquare className="icon-check-status" onClick={() => handleChangeStatus(order, 'delivering', token)} />
                      </div>
                    </tr>                  
                  )
              })}
              </th>  
                                                               
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default Status;

Status.propTypes = {
  setShowStatus: PropTypes.func,
};