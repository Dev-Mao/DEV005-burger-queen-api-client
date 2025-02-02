import { CgClose } from 'react-icons/cg';
import { IoFastFoodOutline } from 'react-icons/io5';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { LuChefHat } from 'react-icons/lu';
import PropTypes from 'prop-types';

const ModalOrder = (props) => {

    // Función que maneja el cambio de estado se showModalOrder, para que no se muestre el modal
    const handleClick = () =>{
        props.setShowModalOrder(false)
    }

    return (
        <div className="background-modal">
            <div className="modal-order">
                <CgClose className="icon-close-modal-order" onClick={handleClick}/> 
                <span> Order sent successfully! </span>
                <div className='icons-modal-order'>
                    <IoFastFoodOutline />
                    <AiOutlineArrowRight />
                    <LuChefHat/>
                </div>
            </div>
        </div>
    );
};

export default ModalOrder;

ModalOrder.propTypes = {
    setShowModalOrder: PropTypes.func,  
};

