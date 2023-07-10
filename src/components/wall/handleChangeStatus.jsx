// Función para cambiar status de la orden
const handleChangeStatus = (order, status, token) => {
  let updateOrderData = {}
  // Si el status al que cambiará la orden es 'delivering', también se almacena la hora en la que se hace ese cambio 
  if(status ===  'delivering'){
    updateOrderData ={
      status: status,
      deliveryDate: new Date(Date.now()).toLocaleTimeString()
    } 
  } else{
    updateOrderData = {
      status: status
    }
  }

  // Solicitud a la API para modificar la información de la orden
  fetch(`https://api-mock-bq-99b0fe710281.herokuapp.com/orders/${order.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Se envía token de autorización
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updateOrderData)
  })
}

export default handleChangeStatus;