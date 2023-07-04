import PropTypes from 'prop-types';
const BtnCreateElement = (props) => {
    const handleClick = () => {
        if(props.optionCreate === 'employee'){
            props.setShowFormUser(true)
        } else {
            props.setShowFormProduct(true)
        }   
    }
    return (
        <div className="container-btn-option-create">
            <button className="btn-option-create" onClick = {handleClick}  >
                Create {props.optionCreate}                     
            </button>
        </div>
    );
};

export default BtnCreateElement;


BtnCreateElement.propTypes = {
    optionCreate: PropTypes.string,
    setShowFormProduct: PropTypes.func,
    setShowFormUser: PropTypes.func,
};