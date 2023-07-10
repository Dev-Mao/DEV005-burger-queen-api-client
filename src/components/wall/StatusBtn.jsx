
import { FiCheckSquare } from 'react-icons/fi';
import PropTypes from 'prop-types';

const StatusBtn = (props) => {
     
    // Llamar al token almacenado
    const token = localStorage.getItem('token');

    // Solicitud a la API para traer las órdenes
    fetch('https://api-mock-bq-99b0fe710281.herokuapp.com/orders', {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    })
    .then(response => response.json())
    .then(data => {
      // Filtramos las órdenes y guardamos las que tienen status delivering
      const ordersReadyToDeliver = data.filter(order => order.status === "delivering");
      props.setCountOrdersReady(ordersReadyToDeliver.length)
      
    })
    .catch(error => {
      console.error('API error:', error);
    });

    const handleClick = () =>{
        props.setShowStatus('true')
    }

    return (
        <button className="btn-navBar" onClick = {handleClick}>
            <FiCheckSquare className="navBar-icon" />
            Status
            {/* Mostrar sobre el botón el número de órdenes listas para entregar */}
            <div className={`count-products ${props.countOrdersReady > 0 ? '' : 'hidden'}`}>
                <span id='count-products'>{props.countOrdersReady}</span>
            </div>
        </button>
    );
};

export default StatusBtn;

StatusBtn.propTypes = {
    setShowStatus: PropTypes.func,
    countOrdersReady: PropTypes.number,
    setCountOrdersReady: PropTypes.func,
};


 
