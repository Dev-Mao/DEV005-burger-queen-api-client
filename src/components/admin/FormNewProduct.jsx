import { CgClose } from "react-icons/cg";
import { CiViewList, CiImageOn } from 'react-icons/ci';
import {MdKeyboardArrowDown, MdAttachMoney} from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';


const FormNewProduct = (props) => {
    
    // Llamado a funciones para formularios
    const { register, handleSubmit, formState: { errors }, setError } = useForm()

    // Obtener token almacenado en localStorage
    const token = localStorage.getItem('token');

    // Manejar el envío del formulario y hacer la solicitud de la api para crear un producto
    const onSubmit = (data) => {
        const newData = {
            name : data.name,
            type: data.type,
            price: data.price,
            image: data.image,
            qty: 1
        }
        //Solicitud a la api para crear producto

        fetch('https://api-mock-bq-99b0fe710281.herokuapp.com/products',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            // Se envía token de autorización
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newData)
        })

        // Si la Api envia codigo status 400 el producto ya existe
        .then((res) => {        
            if (res.status === 400) {
                setError('name', { type: 'invalid', message: 'Product already exists' });          
            } else{                   
                handleClickClose();                     
            }
        })
        .catch((err) => {
        console.log(err)
        })
      
    }
    // Cerrar el formulario
    const handleClickClose = () => {
        props.setShowFormProduct(false)         
    }

    
    return (
        <>
           
            <section className="section-new-product">
                <CgClose  data-testid="close-icon" className="icon-close-form-product" onClick = {handleClickClose}/>
                <h1 className="new-product-title">New product</h1> 
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
                            />     
                        {errors.name && <p className="error-message">{errors.name.message}</p>}                  
                    </div>  
                    <div className="container-input-new-product">  
                        <CiViewList className="icon-form"/>
                        <select defaultValue={''} {...register('type', { required: 'Type is required' })} className = "select-type">
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
                        />
                        {errors.image && <p className="error-message">{errors.image.message}</p>}                        
                    </div>          

                    <button type="submit" className="submit-btn">Create</button>
                </form>        
            </section>
        </>
    );
  };

export default FormNewProduct;

FormNewProduct.propTypes = {
  setShowFormProduct: PropTypes.func,
};
