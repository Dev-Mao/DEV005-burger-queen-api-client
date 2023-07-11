import OptionsAdmin from "./OptionsAdmin";
import BtnCreateElement from "./BtnCreateElement";
import { CgClose } from 'react-icons/cg';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import LogoWall from "../wall/LogoWall";
import ListEmployees from "./ListEmployees";
import ListProducts from "./ListProducts";


// Función para vista de Admin
const AdminView = (props) => {

    // Al dar click en close se muestra vista de Wall nos redirige con navigate
    const navigate = useNavigate()    
     
     const handleClick = () =>{
        props.setShowAdminView(false)
        navigate('/')
    }
   
    return (
        <>
         {/* Mostramos componente con opciones de Admin, botones empleados y productos */}
            <LogoWall/>
            <OptionsAdmin 
                selectedOptionsAdmin = {props.selectedOptionsAdmin} 
                setSelectedOptionsAdmin = {props.setSelectedOptionsAdmin} 
                setOptionCreate = { props.setOptionCreate }   
            />
            
            <CgClose data-testid="close-icon" className="icon-close-status" onClick={handleClick}/>
            <div className="container-tables">
                {/* Maneja la opción (Employee o Products)  */}
                {(props.selectedOptionsAdmin === 'employees') ? (
                    <>
                        {/* Dependiendo de la opción seleccionada (Employee o Products) el boton de crear cambia */}
                        <BtnCreateElement optionCreate ={ props.optionCreate } setShowFormUser = {props.setShowFormUser}/>
                        <ListEmployees 
                            role = {'admin'} 
                            setShowFormEditUser = {props.setShowFormEditUser} 
                            setSelectedUser = {props.setSelectedUser}
                        />
                        <ListEmployees 
                            role = {'chef'} 
                            setShowFormEditUser = {props.setShowFormEditUser} 
                            setSelectedUser = {props.setSelectedUser}
                        />
                        <ListEmployees 
                            role = {'waiter'} 
                            setShowFormEditUser = {props.setShowFormEditUser} 
                            setSelectedUser = {props.setSelectedUser}
                        />
                    </>
                ) 
                : (
                    <>  
                        <BtnCreateElement optionCreate ={ props.optionCreate } setShowFormProduct = {props.setShowFormProduct}/>
                        <ListProducts 
                        type = {'breakfast'} 
                        setShowFormEditProduct = {props.setShowFormEditProduct} 
                        setSelectedProductEdit = {props.setSelectedProductEdit}
                        />
                        <ListProducts 
                        type = {'lunch'}
                        setShowFormEditProduct = {props.setShowFormEditProduct} 
                        setSelectedProductEdit = {props.setSelectedProductEdit}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default AdminView;


AdminView.propTypes = {
    selectedOptionsAdmin: PropTypes.string,
    setSelectedOptionsAdmin: PropTypes.func,
    setShowAdminView: PropTypes.func,
    setOptionCreate: PropTypes.func, 
    optionCreate: PropTypes.string,
    setShowFormProduct: PropTypes.func,
    setShowFormUser: PropTypes.func,
    setSelectedProductEdit: PropTypes.func,
    setShowFormEditProduct: PropTypes.func,
    setSelectedUser: PropTypes.func,
    setShowFormEditUser: PropTypes.func,
};