import PropTypes from 'prop-types';

const ModalConfirm = (props) => {
  
    // Llamar al token almacenado
    const token = localStorage.getItem('token');

    // Función que maneja el cambio de estado se showModalConfirm, para que no se muestre el modal
    const handleClick = () =>{
        props.setShowModalConfirm(false)
    }

    const onDelete = () => {

        // Solicitud a la API para eliminar el item seleccionado
        fetch(`http://localhost:8080/${props.type}/${props.selectedItem.id}`,{
            method: 'DELETE',
            headers: {
            // Se envía token de autorización
            'Authorization': `Bearer ${token}`,
            }
        })
        props.setShowModalConfirm(false)

    }

    // Si es un producto se guarda el nombre en caso contrario con usuario se guarda el email hasta antes del @
    let name;

    if(props.type==='products'){
        name = props.selectedItem.name;
    } else {
        name = props.selectedItem.email.substring(0, props.selectedItem.email.indexOf("@"));
    }

    return (



        <div className="background-modal">
            <div className="modal-order">
                <span> Are you sure you want to delete <strong>{name}</strong>?</span>
                
                <div className='btns-modal-confirm'>
                    <button className="btn-cancel" onClick={handleClick}>Cancel</button>
                    <button className = "btn-confirm"  onClick={() => onDelete()} >Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirm;

ModalConfirm.propTypes = {
    selectedItem: PropTypes.object,
    type: PropTypes.string,
    setShowModalConfirm: PropTypes.func,
};

