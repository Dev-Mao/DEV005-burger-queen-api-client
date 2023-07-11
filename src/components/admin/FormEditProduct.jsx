import { CgClose } from "react-icons/cg";
import {MdKeyboardArrowDown} from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { CiViewList, CiImageOn } from 'react-icons/ci';
import { MdAttachMoney} from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

const FormEditProduct = (props) => {
    // // Llamado a funciones para formularios
    const { register,  formState: { errors }, handleSubmit } = useForm()

    // Obtener token almacenado en localStorage
    const token = localStorage.getItem('token');

    // Manejar el envío del formulario para editar el producto
    const onSubmit = (data) => {
        
        //Solicitud a la api para editar producto por id

        fetch(`http://localhost:8080/${props.selectedProductEdit.id}`,{
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            // Se envía token de autorización
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })
        .then(() => {        
            handleClickClose();
        })
        .catch((err) => {
        console.log(err)
        })      
    }
    // Cerrar el formulario
    const handleClickClose = () => {
        props.setShowFormEditProduct(false)         
    }
    
    return (
        <>
            <section className="section-new-product">
                <CgClose  data-testid="close-icon" className="icon-close-form-product" onClick = {handleClickClose}/>
                <h1 className="new-product-title">Edit product</h1> 
                <form className="form-new-product" onSubmit={handleSubmit(onSubmit)}> 
                    
                    <div className="container-input-new-product">           
                        <IoFastFoodOutline className="icon-form" />   
                        <input
                            {...register('name', {
                                required: 'Name required',
                            })}
                            type="text"
                            className="input-new-product"
                            id="name"
                            placeholder="Name"
                            defaultValue={props.selectedProductEdit.name}
                            />     
                        {errors.name && <p className="error-message">{errors.name.message}</p>}                  
                    </div>  
                    <div className="container-input-new-product">  
                        <CiViewList className="icon-form"/>
                        <select defaultValue={props.selectedProductEdit.type} {...register('type', { required: 'Type is required' })} className = "select-type">
                            <option value=""  disabled>Type</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch - Dinner</option>                           
                        </select>
                        <MdKeyboardArrowDown className="arrow-icon"/>
                        {errors.role && <p className="error-message">{errors.role.message}</p>}1
                    </div>        
                    <div className="container-input-new-product">  
                        <MdAttachMoney className="icon-form" />
                        <input
                            {...register('price', { 
                                required: 'Price required',
                             })}
                            type="number"
                            className="input-new-product"
                            id="price"
                            placeholder="Price"
                            defaultValue={props.selectedProductEdit.price}
                        />
                        {errors.price && <p className="error-message">{errors.price.message}</p>}                        
                    </div>
                    <div className="container-input-new-product">  
                        <CiImageOn className="icon-form" />
                        <input
                            {...register('image', { 
                                required: 'Image required',
                                
                             })}
                            type="text"
                            className="input-new-product"
                            id="image"
                            placeholder="Image URL"
                            defaultValue={props.selectedProductEdit.image}
                        />
                        {errors.image && <p className="error-message">{errors.image.message}</p>}                        
                    </div>          

                    <button type="submit" className="submit-btn">Save</button>
                </form>        
            </section>
        </>
    );
  };

export default FormEditProduct;


FormEditProduct.propTypes = {
    setShowFormEditProduct: PropTypes.func,
    selectedProductEdit: PropTypes.object,
};
